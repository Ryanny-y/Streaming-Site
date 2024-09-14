import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faX, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [ showNav, setShowNav ] = useState(false);

  return (
    <header
      id="header"
      className="fixed top-0 right-0 left-0 py-5 z-40 bg-black"
    >
      <div className="container flex flex-wrap items-center justify-between gap-5 text-white">
        {/* NAVIGATION HEADER */}
        <nav id="header-nav">
          <FontAwesomeIcon icon={faBars} className="text-xl block md:hidden hover:text-red-600 duration-500" onClick={() => setShowNav(true)}/>

          <ul className={`flex flex-wrap justify-center items-center gap-4 text-nowrap fixed bg-black ${showNav ? 'top-0' :'-top-1/2'} py-14 left-0 right-0 z-40 duration-700 transition-all px-5`}>
            <FontAwesomeIcon icon={faChevronUp} className="absolute top-5 right-5 font-semibold" onClick={() => setShowNav(false)}/>
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="movies">Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="series">TV Series</Link>
            </li>
            <li className="nav-link">
              <Link to="genre">Genre</Link>
            </li>
            <li className="nav-link">
              <Link to="country">Country</Link>
            </li>
          </ul>

          <ul className="hidden items-center gap-4 text-nowrap md:flex">
            <li className="nav-link">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-link">
              <Link to="movies">Movies</Link>
            </li>
            <li className="nav-link">
              <Link to="series">TV Series</Link>
            </li>
            <li className="nav-link">
              <Link to="genre">Genre</Link>
            </li>
            <li className="nav-link">
              <Link to="country">Country</Link>
            </li>
          </ul>
        </nav>

        {/* SEARCH BAR */}
        <div
          id="search-bar"
          className="bg-white rounded-full relative px-5 py-2 gap-2 grow flex items-center justify-between"
        >
          <input
            type="text"
            name="search"
            id="search"
            className="bg-transparent outline-none text-sm w-40"
            placeholder="Search Show."
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>

        {/* WATCHLIST AND FAVORITES */}
        <div className="flex items-center gap-4 text-white text-xl">
          <span className="relative group">
            <FontAwesomeIcon icon={faBookmark} className="text-yellow-500" />
            <p className="text-xs absolute top-8 text-nowrap group-hover:opacity-100 left-0 opacity-0 duration-200 transition-all">
              Add To Watchlist
            </p>
          </span>
          <span className="relative group">
            <FontAwesomeIcon icon={faHeart} className="text-red-600" />
            <p className="text-xs absolute top-8 text-nowrap group-hover:opacity-100 left-0 opacity-0 duration-200 transition-all">
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
