import { Link } from "react-router-dom";
import useAuthValue from "../../hooks/useAuthValue";
import useHelper from "../../hooks/useHelper";
import Notification from "../Notification/Notification";
import { useSignOutMutation } from "../../redux/api/authApi";

const Navigation = () => {
  const { navigate } = useHelper();
  const { token, storage, removeAuthValue } = useAuthValue();
  const [signOut] = useSignOutMutation();

  const signOutHandler = () => {
    signOut()
      .then((res) => {
        if (res.error) throw res;
        return res.data;
      })
      .then((data) => {
        console.log("signOutHandler : data", data);
      })
      .catch((err) => {
        console.log("signOutHandler : err", err);
      })
      .finally(() => {
        removeAuthValue();
        navigate("/");
      });
  };

  return (
    <div className="flex items-center justify-center h-[70px] bg-ocean-blue text-white">
      <div className="w-full max-w-screen-xl grid grid-cols-2">
        <div className="flex justify-start items-center">
          <Link
            to={"/"}
            className="p-2 font-bold text-md lg:text-2xl bg-white text-ocean-blue"
          >
            LOGO HERE
          </Link>
        </div>
        <div className="flex justify-end items-center gap-x-8">
          {token && <Notification />}
          {token ? (
            <Link
              onClick={signOutHandler}
              className="font-medium text-sm text-white"
            >
              Sign Out
            </Link>
          ) : (
            <Link to={"/sign-in"} className="font-medium text-sm text-white">
              Sign In
            </Link>
          )}
          {token && (
            <Link
              to={`/profile/${storage.user.username}`}
              className="font-medium text-sm text-white"
            >
              Profile
            </Link>
          )}
          {token && (
            <Link
              to={"/auction-my-item"}
              className="font-medium text-sm text-white"
            >
              Auction My Item
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
