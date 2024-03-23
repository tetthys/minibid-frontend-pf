import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-[120px]">
      <div className="h-[70px] bg-ocean-blue"></div>
      <div className="w-full flex items-center justify-center">
        <div className="min-h-[12rem] w-full max-w-screen-xl flex flex-col lg:flex-row items-center justify-between">
          <Link
            to={"/"}
            className="p-2 font-bold text-md lg:text-2xl bg-white text-ocean-blue"
          >
            LOGO HERE
          </Link>
          <div className="grid grid-cols-2 lg:grid-cols-4 justify-start items-center gap-x-16">
            <div className="grid grid-cols-1">
              <span className="text-xl font-semibold text-black">Lorem</span>
              <div className="mt-5 grid grid-cols-1 gap-y-3">
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <span className="text-xl font-semibold text-black">Lorem</span>
              <div className="mt-5 grid grid-cols-1 gap-y-3">
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <span className="text-xl font-semibold text-black">Lorem</span>
              <div className="mt-5 grid grid-cols-1 gap-y-3">
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <span className="text-xl font-semibold text-black">Lorem</span>
              <div className="mt-5 grid grid-cols-1 gap-y-3">
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
                <span className="text-sm font-medium text-gray-400">Lorem</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
