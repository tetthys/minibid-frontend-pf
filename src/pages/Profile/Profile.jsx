import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../../helpers/tailwindcss";
import { useParams } from "react-router-dom";
import { useGetUserByUsernameQuery } from "../../redux/api/userApi";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { uiActions } from "../../redux/slice/uiSlice";
import useHelper from "../../hooks/useHelper";
import useAuthValue from "../../hooks/useAuthValue";
import CheckoutsById from "../../components/Profile/CheckoutsById";
import BidsById from "../../components/Profile/BidsById";
import WithdrawalsById from "../../components/Profile/WithdrawalsById";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import Chat from "../../components/Chat/Chat";
import SearchBar from "../../components/Layout/SearchBar";
import CardOnProfile from "../../components/Profile/CardOnProfile";
import BankOnProfile from "../../components/Profile/BankOnProfile";
import Footer from "../../components/Layout/Footer";
import BaseContainer from "../../components/Layout/BaseContainer";
import Navigation from "../../components/Layout/Navigation";
import AuctionsByUsername from "../../components/Auction/AuctionsByUsername";
import ProfileSetting from "../../components/Profile/ProfileSetting";

const Profile = () => {
  const { dispatch } = useHelper();

  let { username } = useParams();

  const { storage, token } = useAuthValue();

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useGetUserByUsernameQuery(username);

  const isSettingOpen = useSelector((state) => state.ui.setting.open);

  return (
    <BaseContainer>
      <SearchBar />
      <Navigation />
      {isError && <p>Error</p>}
      {isLoading || isFetching ? (
        <p>...</p>
      ) : (
        <>
          <ProfileSetting
            open={isSettingOpen}
            onCLose={() => {
              dispatch(
                uiActions.toggleSetting({
                  open: false,
                })
              );
            }}
          />
          <div className="px-18 pb-28 mt-20 mb-10 w-full max-w-screen-xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-x-9">
              <div className="flex flex-col gap-y-5">
                <div className="relative py-10 flex flex-col gap-y-7 justify-center items-center w-[260px] rounded bg-white">
                  {storage.user.id === user.id && (
                    <div className="absolute top-1 right-1">
                      <FontAwesomeIcon
                        className="w-4 h-4 text-gray-300 transition-all duration-300 ease-in-out hover:text-gray-400 cursor-pointer"
                        icon={faCog}
                        onClick={() => {
                          dispatch(
                            uiActions.toggleSetting({
                              open: true,
                            })
                          );
                        }}
                      />
                    </div>
                  )}
                  <img
                    className="w-20 h-20 rounded-full object-center"
                    src="https://www.svgrepo.com/show/192247/man-user.svg"
                    alt="https://www.svgrepo.com/show/192247/man-user.svg"
                  />
                  <h3 className="font-bold text-xl">{user.username}</h3>
                  <span className="font-light text-base">
                    Registered at {moment(user.createdAt).format("YYYY/MM/DD")}
                  </span>
                </div>
                {token && (
                  <div className="group">
                    <button
                      onClick={() => {
                        dispatch(uiActions.toggleChat({ open: true }));
                      }}
                      className="py-2.5 px-5 w-[260px] bg-white rounded font-medium text-gray-800 group-hover:text-gray-600"
                    >
                      <FontAwesomeIcon
                        icon={faMessage}
                        className="mr-2 w-4 h-4 text-gray-800 group-hover:text-gray-600"
                      />
                      Open Chat
                    </button>
                    <Chat senderId={storage.user.id} receiverId={user.id} />
                  </div>
                )}
              </div>
              <div className="mt-12 lg:mt-0 flex flex-col gap-y-10">
                <div className="flex flex-wrap gap-y-5 lg:gap-x-10">
                  <div className="p-10 bg-white flex flex-col gap-y-5 rounded">
                    <span className="text-[#8A8A8A] text-xl">Sold</span>
                    <span className="text-black text-4xl font-bold">
                      {user.sumOfUserSold ? user.sumOfUserSold : 0}
                    </span>
                  </div>
                  <div className="p-10 bg-white flex flex-col gap-y-5 rounded">
                    <span className="text-[#8A8A8A] text-xl">Bought</span>
                    <span className="text-black text-4xl font-bold">
                      {user.sumOfUserBought ? user.sumOfUserBought : 0}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-y-5 lg:gap-x-10">
                  <div className="p-10 bg-white flex flex-col gap-y-5 rounded">
                    <span className="text-[#8A8A8A] text-xl">Sold Items</span>
                    <span className="text-black text-4xl font-bold">
                      {user.countOfUserSold ? user.countOfUserSold : 0}
                    </span>
                  </div>
                  <div className="p-10 bg-white flex flex-col gap-y-5 rounded">
                    <span className="text-[#8A8A8A] text-xl">Bought Items</span>
                    <span className="text-black text-4xl font-bold">
                      {user.countOfUserBought ? user.countOfUserBought : 0}
                    </span>
                  </div>
                  <div className="p-10 bg-white flex flex-col gap-y-5 rounded">
                    <span className="text-[#8A8A8A] text-xl">Bidding</span>
                    <span className="text-black text-4xl font-bold">
                      {user.countOfBidding ? user.countOfBidding : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Tab */}
            {storage.user.username === username && (
              <div id="profile-tab" name="profile-tab" className="mt-24">
                <Tab.Group defaultIndex={0}>
                  <Tab.List>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white hover:bg-opacity-80",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Card
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white hover:bg-opacity-80",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Withdraw
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white hover:bg-opacity-80",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Bidding History
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white hover:bg-opacity-80",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Withdraw History
                        </div>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <div
                          className={classNames(
                            selected
                              ? "bg-white text-ocean-blue"
                              : "bg-ocean-blue text-white hover:bg-opacity-80",
                            "mb-4 lg:mb-14 w-[215px] py-2.5 uppercase font-bold text-base inline-flex justify-center items-center focus:outline-none cursor-pointer"
                          )}
                        >
                          Payment History
                        </div>
                      )}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <CardOnProfile />
                    </Tab.Panel>
                    <Tab.Panel>
                      <BankOnProfile />
                    </Tab.Panel>
                    <Tab.Panel>
                      <BidsById userId={storage.user.id} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <WithdrawalsById userId={storage.user.id} />
                    </Tab.Panel>
                    <Tab.Panel>
                      <CheckoutsById userId={storage.user.id} />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            )}
          </div>
          <AuctionsByUsername username={user.username} />
        </>
      )}
      <Footer />
    </BaseContainer>
  );
};

export default Profile;
