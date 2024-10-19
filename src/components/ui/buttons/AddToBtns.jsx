import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useContext, useCallback } from "react";
import { AuthContext } from '../../../context/AuthContext'

const AddToBtns = ({ show_id }) => {
  const navigate = useNavigate();
  const { userData, accessToken } = useContext(AuthContext);
  const BC_URL = import.meta.env.BC_URL;

  const isAuth = useCallback(() => {
    if(!accessToken || !Object.keys(userData).length) {
      navigate('/login')
    }
  }, [userData, accessToken, navigate])
  
  const addToWatchlist = async () => {


  };

  return (
    <div className="action_btns flex items-stretch justify-between gap-2">
      <button onClick={() => addToWatchlist()} className="bg-yellow-600 grow py-2 rounded-lg font-medium text-sm tracking-wide">
        Add To Watchlist
      </button>
      <button className="bg-red-700 px-2 rounded-lg">
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
};

export default AddToBtns;
