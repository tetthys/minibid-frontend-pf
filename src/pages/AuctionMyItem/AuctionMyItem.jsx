import TinyMCEEditor from "../../components/utils/TinyMCEEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useHelper from "../../hooks/useHelper";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import combineDateAndTime from "../../helpers/combineDateAndTime";
import FormControl from "../../components/AuctionMyItem/FormControl";
import FormControlWrapper from "../../components/AuctionMyItem/FormControlWrapper";
import Label from "../../components/AuctionMyItem/Label";
import Select from "../../components/AuctionMyItem/Select";
import useWebSocketValidation from "../../hooks/useWebSocketValidation";
import UploadImage from "../../components/File/UploadImage";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import SearchBar from "../../components/Layout/SearchBar";
import Footer from "../../components/Layout/Footer";
import convertCurrencyFormat from "../../helpers/convertCurrencyFormat";
import useWebSocket from "../../hooks/useWebSocket";
import Error from "../../components/AuctionMyItem/Error";
import { useCreateProductMutation } from "../../redux/api/productApi";

const dateAWeekLater = () => {
  return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
};

const timeAWeekLater = () => {
  return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[1]
    .split(".")[0];
};

const AuctionMyItem = () => {
  const { navigate } = useHelper();

  const [createProduct] = useCreateProductMutation();

  const [categoriesOriginal, setCategoriesOriginal] = useState([]);

  const { wsCli: wsCliForData } = useWebSocket({
    url: `/data_interface?categories=true`,
    allowGuest: true,
  });

  useWebSocketEvent(
    wsCliForData,
    () => {},
    (data) => {
      if (data.type === "server.send:categories") {
        setCategoriesOriginal((prev) => [...prev, ...data.data]);
      }
    },
    "AuctionMyItem"
  );

  const [name, setName] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [description, setDescription] = useState();
  const [categoryIdSelected, setCategoryIdSelected] = useState();
  const [categoryIdArrSelected, setCategoryIdArrSelected] = useState([]);
  const [startingPrice, setStartingPrice] = useState();
  const [images, setImages] = useState([]);
  const [endAtDate, setEndAtDate] = useState(dateAWeekLater());
  const [endAtTime, setEndAtTime] = useState(timeAWeekLater());

  const [validationError, setValidationError] = useState();

  const { wsCli: wsCliForValidation } = useWebSocket({
    url: `/live_validation?middleware=createNewProduct`,
  });

  useWebSocketEvent(
    wsCliForValidation,
    () => {},
    (data) => {
      if (data.type === "server.send:validation.error") {
        setValidationError(data.data);
      }
    },
    "AuctionMyItem.jsx"
  );

  useWebSocketValidation(
    {
      type: "client.send:data",
      data: {
        name: name,
        starting_price: convertCurrencyFormat(startingPrice),
        short_description: shortDescription,
        end_at: combineDateAndTime(endAtDate, endAtTime),
        description: description,
        categories: categoryIdArrSelected,
        product_images: [...images.map((image) => image.url)],
      },
    },
    {
      wsCli: wsCliForValidation,
      dependencies: [
        name,
        shortDescription,
        description,
        categoryIdSelected,
        categoryIdArrSelected,
        startingPrice,
        endAtDate,
        endAtTime,
      ],
    }
  );

  const createProductHandler = () => {
    createProduct({
      name: name,
      starting_price: convertCurrencyFormat(startingPrice),
      short_description: shortDescription,
      end_at: combineDateAndTime(endAtDate, endAtTime),
      description: description,
      categories: categoryIdArrSelected,
      product_images: [...images.map((image) => image.url)],
    })
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        console.log("createProductHandler : data", data);
        navigate(`/auction/${data.product.id}`);
      })
      .catch((err) => {
        console.log("createProductHandler : err", err);
        setValidationError(err.error.data);
      });
  };

  return (
    <BaseContainer>
      <SearchBar />
      <Navigation />
      <div className="mt-24 px-4 lg:px-40 py-32 mx-auto max-w-6xl bg-white rounded-xl">
        <div className="grid grid-cols-1 gap-y-10">
          <FormControlWrapper>
            <Label>Product Name</Label>
            <FormControl
              placeholder="Product Name"
              type="text"
              name="product-name"
              id="product-name"
              onChangeHandler={(e) => {
                setName(e.target.value);
              }}
              error={validationError}
              errorLabel="name"
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <Label>Starting Price</Label>
            <FormControl
              placeholder="Starting Price"
              type="text"
              name="starting-price"
              id="starting-price"
              onChangeHandler={(e) => {
                setStartingPrice(e.target.value);
              }}
              error={validationError}
              errorLabel="startingPrice"
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <Label>Short Description</Label>
            <FormControl
              placeholder="Short Description"
              type="text"
              name="short-description"
              id="short-description"
              onChangeHandler={(e) => {
                setShortDescription(e.target.value);
              }}
              error={validationError}
              errorLabel="shortDescription"
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <Label>End At</Label>
            <div className="grid grid-cols-2 gap-x-4">
              <FormControl
                type="date"
                name="end-at-date"
                id="end-at-date"
                defaultValue={endAtDate}
                onChange={(e) => {
                  setEndAtDate(e.target.value);
                }}
                error={validationError}
                errorLabel="endAt"
              />
              <FormControl
                type="time"
                name="end-at-time"
                id="end-at-time"
                defaultValue={endAtTime}
                onChange={(e) => {
                  setEndAtTime(e.target.value);
                }}
                error={validationError}
                errorLabel="endAt"
              />
            </div>
          </FormControlWrapper>
          <FormControlWrapper>
            <Label>Category</Label>
            <div className="grid grid-cols-2 gap-x-4">
              <Select name="category" id="category">
                <option disabled selected>
                  Select a category
                </option>
                {categoriesOriginal?.map((category, i) => (
                  <option
                    key={i}
                    value={category.id}
                    onClick={() => {
                      setCategoryIdSelected(category.id);
                    }}
                  >
                    {category.name}
                  </option>
                ))}
              </Select>
              <div className="flex items-center justify-start">
                <span
                  className="font-medium text-base text-gray-500 hover:underline cursor-pointer"
                  onClick={() => {
                    setCategoryIdArrSelected((prev) => [
                      ...prev,
                      categoryIdSelected,
                    ]);
                  }}
                >
                  Add New
                </span>
              </div>
            </div>
            <div className="mt-6 w-full">
              <div className="flex flex-wrap gap-2">
                {categoryIdArrSelected.map((categoryId, i) => (
                  <span
                    key={i}
                    className="px-5 py-2.5 rounded-3xl bg-gray-100 hover:bg-gray-200 text-gray-600 group"
                  >
                    {categoriesOriginal?.find((c) => c.id === categoryId)?.name}
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="ml-4 w-3 h-3 text-gray-300 group-hover:text-gray-400"
                      onClick={() => {
                        setCategoryIdArrSelected((prev) =>
                          prev.filter((c) => c !== categoryId)
                        );
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
            <Error
              error={validationError}
              errorLabel={["categories", "category"]}
            />
          </FormControlWrapper>
          <FormControlWrapper>
            <Label>Description</Label>
            <TinyMCEEditor
              initialValue={description}
              setState={setDescription}
            />
            <Error error={validationError} errorLabel="description" />
          </FormControlWrapper>
          <FormControlWrapper>
            <Label>Product Image</Label>
            <UploadImage setImages={setImages} />
            <Error error={validationError} errorLabel="productImages" />
          </FormControlWrapper>
        </div>
      </div>
      <div className="mt-14 mx-auto max-w-6xl flex gap-x-6 justify-end items-center">
        <button
          className="py-2.5 px-3 min-w-[7.5rem] font-medium text-base rounded-md bg-white hover:bg-opacity-80 text-black"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <button
          className="py-2.5 px-3 min-w-[7.5rem] font-medium text-base rounded-md bg-ocean-blue hover:bg-opacity-80 text-white"
          type="button"
          onClick={createProductHandler}
        >
          Create
        </button>
      </div>
      <Footer />
    </BaseContainer>
  );
};

export default AuctionMyItem;
