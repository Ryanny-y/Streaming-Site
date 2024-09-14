import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const WatchBtn = () => {
  return (
    <button
      id="watch_btn"
      className="flex items-center gap-2 bg-red-600 w-full justify-center self-center py-1 font-semibold text-sm rounded-sm tracking-wide hover:bg-light-red duration-300"
    >
      <FontAwesomeIcon icon={faPlay} />
      Watch Now
    </button>
  );
};

export default WatchBtn;
