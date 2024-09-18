import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const headerNav = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    // Nagation Header
    <nav id="header-nav">
      <FontAwesomeIcon
        icon={faBars}
        className="text-xl block md:hidden hover:text-red-600 duration-500"
        onClick={() => setShowNav(true)}
      />

      <ul
        className={`flex flex-wrap justify-center items-center gap-4 fixed bg-black ${
          showNav ? "top-0" : "-top-1/2"
        } py-14 left-0 right-0 z-40 duration-700 transition-all px-5`}
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          className="absolute top-5 right-5 font-semibold"
          onClick={() => setShowNav(false)}
        />
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
          <Link to="genres">Genre</Link>
        </li>
        <li className="nav-link">
          <Link to="countries">Countries</Link>
        </li>
      </ul>

      <ul className="hidden items-center gap-4 md:flex">
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
          <Link to="genres">Genre</Link>
        </li>
        <li className="nav-link">
          <Link to="countries">Countries</Link>
        </li>
      </ul>
    </nav>
  );
};

export default headerNav;
