import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUpload from "../../hooks/useUpload";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { config } from "../../config/config";
import renderImage from "../../helpers/renderImage";

const Image = ({ idx, setImages }) => {
  const { upload, uploadDone, file, setFile, data, error, remove } = useUpload({
    url: `${config.backendHttpUrl}/upload-file/product/image`,
    key: "image",
  });

  const [index, setIndex] = useState(idx);

  useEffect(() => {
    if (file) {
      upload();
    }
  }, [file]);

  useEffect(() => {
    if (data) {
      setImages((prev) => [
        ...prev.filter((e) => e.index !== index),
        { index: index, url: data.url },
      ]);
    }
  }, [data]);

  return (
    <>
      {data ? (
        <>
          <div className="relative">
            <FontAwesomeIcon
              className="absolute top-2.5 right-2.5 w-6 h-6 text-red-500 hover:text-red-400"
              icon={faCircleXmark}
              onClick={() => {
                remove();
                setImages((prev) => [
                  ...prev.filter((element) => element.index !== index),
                ]);
              }}
            />
            <label htmlFor={index}>
              <img
                className="w-[12.5rem] h-[12.5rem] bg-black rounded-md object-scale-down"
                src={renderImage(data.url)}
                alt={renderImage(data.url)}
              />
            </label>
          </div>
          <input
            className="sr-only"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            type="file"
            name={index}
            id={index}
          />
        </>
      ) : (
        <>
          <div className="w-[12.5rem] h-[12.5rem] rounded-md flex justify-center items-center border-2 border-gray-200">
            <label htmlFor={index}>
              <FontAwesomeIcon
                className="w-8 h-8 text-gray-300"
                icon={faFolderPlus}
              />
            </label>
            <input
              className="sr-only"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              type="file"
              name={index}
              id={index}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Image;
