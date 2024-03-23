import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useRemainingTime from "../../hooks/useRemainingTime";
import useHelper from "../../hooks/useHelper";
import useAuthValue from "../../hooks/useAuthValue";

const AuctionCard = ({
  id,
  name,
  endAt,
  startingPrice,
  countOfUserBidding,
  highestBiddingPrice,
  user,
}) => {
  const { storage } = useAuthValue();
  const { navigate } = useHelper();
  const { remainingTime } = useRemainingTime(endAt, [endAt]);
  return (
    <div className="relative px-5 py-10 bg-white w-[20rem] grid grid-cols-1 grid-rows-3 gap-y-12 justify-items-center items-center shadow-md rounded">
      {storage.user.id === user.id && (
        <div className="absolute top-1 right-1">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="w-4 h-4 text-gray-300 transition-all duration-300 ease-in-out hover:text-gray-400"
            onClick={() => navigate(`/auction/${id}/edit`)}
          />
        </div>
      )}
      <Link to={`/auction/${id}`} className="font-bold text-black text-xl">
        {name}
      </Link>
      {highestBiddingPrice ? (
        <span className="text-3xl font-bold text-ocean-blue">
          {highestBiddingPrice}
        </span>
      ) : (
        <span className="text-3xl font-bold text-gray-200">
          {startingPrice}
        </span>
      )}
      <div className="flex justify-start gap-x-5">
        <div>
          <FontAwesomeIcon className="w-3.5 h-3.5 text-black" icon={faClock} />{" "}
          <span className="font-semibold text-black text-sm">
            {remainingTime}
          </span>
        </div>
        <div>
          <FontAwesomeIcon className="w-3.5 h-3.5 text-black" icon={faUsers} />
          <span className="font-semibold text-black text-sm">
            {" "}
            {countOfUserBidding}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
