import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      id="header"
      className="fixed top-0 right-0 left-0 py-5 z-40 bg-black"
    >
      <div className="container flex items-center justify-between gap-10">
        {/* NAVIGATION HEADER */}
        <nav id="header-nav">
          <ul className="flex items-center gap-4 text-white">
            <li className="relative after:absolute after:h-2 after:w-2 after:bg-red-500 after:rounded-full after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:opacity-0 hover:after:opacity-100 after:duration-300">
              <Link to="/">Home</Link>
            </li>
            <li className="relative after:absolute after:h-2 after:w-2 after:bg-red-500 after:rounded-full after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:opacity-0 hover:after:opacity-100 after:duration-300">
              <Link to="movies">Movies</Link>
            </li>
            <li className="relative after:absolute after:h-2 after:w-2 after:bg-red-500 after:rounded-full after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:opacity-0 hover:after:opacity-100 after:duration-300">
              <Link to="series">TV Series</Link>
            </li>
            <li className="relative after:absolute after:h-2 after:w-2 after:bg-red-500 after:rounded-full after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:opacity-0 hover:after:opacity-100 after:duration-300">
              <Link to="genre">Genre</Link>
            </li>
            <li className="relative after:absolute after:h-2 after:w-2 after:bg-red-500 after:rounded-full after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:opacity-0 hover:after:opacity-100 after:duration-300">
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
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search Show."
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>

        {/* LOGIN/REGISTER */}
        <div className="buttons text-white flex items-center gap-3 font-semibold">
          <button className="text-red-500 px-5 py-1 rounded-full hover:text-white duration-200">
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
