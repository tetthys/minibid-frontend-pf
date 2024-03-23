const AuctionCardContainer = ({ title, meta, children }) => {
  return (
    <div className="my-28 w-full max-w-screen-xl mx-auto">
      {title && <h3 className="font-bold text-3xl">{title}</h3>}
      {meta && <h3 className="-mt-14 font-medium text-xl">{meta}</h3>}
      <div className="mt-14 grid grid-cols-1 gap-x-20 gap-y-16 lg:grid-cols-3 lg:gap-x-40 lg:gap-y-32 justify-items-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuctionCardContainer;
