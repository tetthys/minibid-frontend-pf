import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useHelper = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    dispatch,
    navigate,
  };
};

export default useHelper;
