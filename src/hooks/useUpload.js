import axios from "axios";
import { useState } from "react";

const useUpload = ({ url, key = "image" }) => {
  const [file, setFile] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();

  const [uploadDone, setUploadDone] = useState(false);

  const [filePath, setFilePath] = useState();

  const upload = async () => {
    const formData = new FormData();
    formData.append(key, file);

    await axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("upload called");
        setData(response.data);
        setUploadDone(true);
        setFilePath(response.data.url.split("/").pop());
      })
      .catch((error) => {
        setError(error);
      });
  };

  const remove = () => {
    setFile();
    setFilePath();
    setData();
    setUploadDone(false);
  };

  return {
    upload,
    uploadDone,
    file,
    setFile,
    data,
    error,
    filePath,
    setFilePath,
    remove,
    setData,
  };
};

export default useUpload;
