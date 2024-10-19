import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ActionContext } from "../../../context/ActionsContext";

const AddToBtns = ({ show_id }) => {

  const { handleAdd } = useContext(ActionContext);

  return (
    <div className="action_btns flex items-stretch justify-between gap-2">
      <button onClick={() => handleAdd(show_id, 'watchlist')} className="bg-yellow-600 grow py-2 rounded-lg font-medium text-sm tracking-wide">
        Add To Watchlist
      </button>
      <button onClick={() => handleAdd(show_id, 'favorites')} className="bg-red-700 px-2 rounded-lg">
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
};

export default AddToBtns;
