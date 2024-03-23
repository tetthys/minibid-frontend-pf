import Image from "./Image";
import UpdateImage from "./UpdateImage";

const UploadImage = ({ setImages, images }) => {
  return (
    <>
      <div className="px-8 py-16 gap-x-5 gap-y-12 grid grid-cols-1 lg:grid-cols-3 justify-items-center w-full min-h-[16.875rem] border-2 border-gray-200 rounded-md">
        {images ? (
          <>
            {images.map((image) => (
              <UpdateImage
                key={image.index}
                idx={image.index}
                image={image}
                setImages={setImages}
              />
            ))}
            {Array.from({ length: 6 - images.length }).map((_, i) => (
              <Image
                key={Math.random()}
                idx={Math.random()}
                setImages={setImages}
              />
            ))}
          </>
        ) : (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <Image key={i} idx={i} setImages={setImages} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default UploadImage;
