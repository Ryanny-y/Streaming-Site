import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import HeaderNav from "../ui/header/HeaderNav";
import SearchBar from "../ui/header/SearchBar";
 
const Header = () => {

  return (
    <header id="header" className="sticky top-0 py-5 z-40 bg-black">
      <div className="container flex flex-wrap items-center justify-between gap-5 text-white">
        {/* Nav Header */}
        <HeaderNav />

        {/* Search Bar */}
        <SearchBar />

        {/* WATCHLIST AND FAVORITES */}
        <div className="flex items-center gap-4 text-white text-xl">
          <span className="relative group flex">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-yellow-500 group-hover:hidden"
            />
            <i className="fas fa-bookmark hidden group-hover:block text-yellow-500"></i>
            <p className="text-xs absolute top-8 group-hover:opacity-100 left-0 opacity-0 transition-all">
              Add To Watchlist
            </p>
          </span>
          <span className="relative group flex">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-600 group-hover:hidden"
            />
            <i className="fas fa-heart hidden group-hover:block text-red-600"></i>
            <p className="text-xs absolute top-8 group-hover:opacity-100 left-0 opacity-0 transition-all">
              Add To Favorites
            </p>
          </span>
        </div>

        {/* LOGIN/REGISTER */}
        <div className="buttons text-white flex items-center gap-3 font-semibold ml-auto">
          <button className="text-red-500 py-1 rounded-full hover:text-white duration-200">
            Login
          </button>
          <button className="bg-red-700 px-5 py-1 rounded-full hover:bg-light-red duration-200">
            Register
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
