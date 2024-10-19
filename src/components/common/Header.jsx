import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import HeaderNav from "../ui/header/HeaderNav";
import SearchBar from "../ui/header/SearchBar";
import { Link } from "react-router-dom"; 
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {

  const { userData, accessToken } = useContext(AuthContext);

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
            {(Object.keys(userData).length > 0 && accessToken) && <p className="absolute text-xs -right-1 -top-2">0</p>}
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
          <Link to='login' className="text-red-500 py-1 rounded-full hover:text-white duration-200">
            Login
          </Link>
          <Link to='signup' className="bg-red-700 px-5 py-1 rounded-full hover:bg-light-red duration-200">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
