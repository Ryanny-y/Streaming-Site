import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useContext, useCallback } from "react";
import { AuthContext } from '../../../context/AuthContext'

const AddToBtns = ({ show_id }) => {
  const navigate = useNavigate();
  const { userData, accessToken } = useContext(AuthContext);
  const BC_URL = import.meta.env.VITE_BC_URL;

  const isAuth = useCallback(() => {
    if(!accessToken) {
      navigate('/login');
      return false;
    }
    return true;
  }, [userData, accessToken, navigate])
  

  const handleAdd = async () => {
    if(!isAuth()) return;

    if(!show_id) {
      alert('Show Id is required');
      return;
    }

    try {
      const response = await fetch(`${BC_URL}/watchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          user_id: userData?.id,
          show_id
        })
      })

      if(!response.ok) {
        const errData = await response.json();
        const errmsg = errData.message || errData.statusText;
        throw new Error(errmsg);
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.log(error.message)
    }
    

  };
  

  return (
    <div className="action_btns flex items-stretch justify-between gap-2">
      <button onClick={() => handleAdd()} className="bg-yellow-600 grow py-2 rounded-lg font-medium text-sm tracking-wide">
        Add To Watchlist
      </button>
      <button className="bg-red-700 px-2 rounded-lg">
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
};

export default AddToBtns;
