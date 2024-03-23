import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Tab } from "@headlessui/react";
import { classNames } from "../../helpers/tailwindcss";
import { Link, useParams } from "react-router-dom";
import { uiActions } from "../../redux/slice/uiSlice";
import useAuthValue from "../../hooks/useAuthValue";
import useHelper from "../../hooks/useHelper";
import renderImage from "../../helpers/renderImage";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import Footer from "../../components/Layout/Footer";
import SearchBar from "../../components/Layout/SearchBar";
import BidModal from "../../components/BidModal/BidModal";
import Chat from "../../components/Chat/Chat";
import useWebSocketEvent from "../../hooks/useWebSocketEvent";
import useRemainingTime from "../../hooks/useRemainingTime";
import useWebSocket from "../../hooks/useWebSocket";
import { useGetProductByIdQuery } from "../../redux/api/productApi";
import SeeAlso from "../../components/Auction/SeeAlso";

const Auction = () => {
  const { dispatch } = useHelper();

  const { token, storage } = useAuthValue();

  let { auctionId } = useParams();
  const {
    data: product,
    isLoading,
    isFetching,
    isError,
  } = useGetProductByIdQuery(auctionId);

  const { remainingTime } = useRemainingTime(product?.endAt, [product]);

  const [highestBiddingPrice, setHighestBiddingPrice] = useState(0);
  const [countOfUserBidding, setCountOfUserBidding] = useState(0);

  const { wsCli } = useWebSocket({
    url: `/product?productId=${product?.id}`,
    dependencies: [product],
    allowGuest: true,
  });

  useWebSocketEvent(
    wsCli,
    () => {},
    (data) => {
      if (data.type === "server.send:product") {
        setHighestBiddingPrice(data.data.highestBiddingPrice);
        setCountOfUserBidding(data.data.countOfUserBidding);
      }
      if (data.type === "server.broadcast:updated_product") {
        setHighestBiddingPrice(data.data.highestBiddingPrice);
        setCountOfUserBidding(data.data.countOfUserBidding);
      }
    },
    "Auction.jsx"
  );

  const [mainImage, setMainImage] = useState();

  useEffect(() => {
    if (!product) return;
    setMainImage(product.productImages[0].path);
  }, [product]);

  return (
    <>
      <BaseContainer>
        <SearchBar />
        <Navigation />
        {isError && <p>Error</p>}
        {isLoading || isFetching ? (
          <p>...</p>
        ) : (
          <>
            <div className="px-18 pb-28 w-full max-w-screen-xl mx-auto">
              {/* title */}
              <div className="mb-12 w-full border-b-[3px] border-gray-200">
                <h1 className="py-8 text-2xl font-bold">{product.name}</h1>
              </div>
              {/* product */}
              <div className="px-2 lg:px-0 grid grid-cols-1 lg:grid-cols-2 gap-x-20">
                <div className="flex flex-col gap-y-2">
                  <img
                    className="w-full object-scale-down aspect-square shadow-sm bg-black"
                    src={renderImage(mainImage)}
                    alt={renderImage(mainImage)}
                  />
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-1">
                    {product.productImages.map((image, i) => (
                      <img
                        key={i}
                        className="w-full object-scale-down aspect-square shadow-sm bg-black"
                        src={renderImage(image.path)}
                        alt={renderImage(image.path)}
                        onMouseEnter={() => setMainImage(image.path)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  {/* Categories */}
                  {product.productCategories?.length > 0 && (
                    <div className="mt-8 lg:mt-0 mb-8">
                      {product.productCategories?.map((productCategory, i) => (
                        <span key={i} className="font-medium text-base">
                          {productCategory.category.name}
                          {product.productCategories?.length - 1 === i
                            ? ""
                            : ", "}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Short Description */}
                  <p className="mb-12 font-light text-base leading-6">
                    {product.shortDescription}
                  </p>
                  {/* Price related */}
                  <div className="mb-16 grid grid-cols-1 gap-y-9">
                    <div className="flex justify-start items-center gap-x-3">
                      <FontAwesomeIcon
                        className="text-black opacity-60 w-6 h-6"
                        icon={faClock}
                      />
                      <span className="text-2xl font-extrabold">
                        {remainingTime}
                      </span>
                    </div>
                    <div className="flex justify-start items-center gap-x-3">
                      <FontAwesomeIcon
                        className="text-black opacity-60 w-6 h-6"
                        icon={faUsers}
                      />
                      <span className="text-2xl font-extrabold">
                        {countOfUserBidding}
                      </span>
                    </div>
                    {/* highest bidding price or starting price */}
                    <div>
                      {highestBiddingPrice ? (
                        <span className="text-2xl font-bold text-ocean-blue">
                          {highestBiddingPrice}
                        </span>
                      ) : (
                        <span className="text-2xl font-bold text-gray-300">
                          {product.startingPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Buttons */}
                  {token && (
                    <div className="mt-32 flex gap-x-1 lg:gap-x-5">
                      <button
                        onClick={() => {
                          dispatch(uiActions.toggleChat({ open: true }));
                        }}
                        className="min-w-[10.625rem] p-2.5 rounded-md flex justify-center items-center font-medium bg-white text-black"
                      >
                        <FontAwesomeIcon
                          className="w-4 h-4 mr-2"
                          icon={faMessage}
                        />
                        Ask to seller
                      </button>
                      <button
                        onClick={() => {
                          dispatch(uiActions.toggleBid({ open: true }));
                        }}
                        className="min-w-[10.625rem] p-2.5 rounded-md flex justify-center items-center font-bold bg-ocean-blue text-white uppercase"
                      >
                        Place a bid
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* tab */}
              <div className="mt-24">
                <Tab.Group defaultIndex={0}>
                  <Tab.List>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Description
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Seller Information
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div
                        className="mt-14 lg:mt-0"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="mt-14 lg:mt-0 mb-3">
                        <span className="text-base font-light mr-3">
                          Seller
                        </span>
                        <Link
                          to={`/profile/${product.user.username}`}
                          className="text-base font-bold text-ocean-blue"
                        >
                          {product.user.username}
                        </Link>
                      </div>
                      <div>
                        <span className="text-base font-light mr-3">
                          Credit level
                        </span>
                        <span className="text-base font-bold text-ocean-blue">
                          Trustable
                        </span>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
            <Chat senderId={storage.user.id} receiverId={product.user.id} />
            <BidModal product={product} />
          </>
        )}
        <SeeAlso />
        <Footer />
      </BaseContainer>
    </>
  );
};

export default Auction;
