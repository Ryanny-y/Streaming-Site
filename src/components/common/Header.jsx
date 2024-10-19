import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-regular-svg-icons";
import HeaderNav from "../ui/header/HeaderNav";
import SearchBar from "../ui/header/SearchBar";
import { Link } from "react-router-dom"; 
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();
  const { userData, accessToken } = useContext(AuthContext);
  const [ watchlistCount, setWatchlistCount ] = useState(0);
  const [ favoritesCount, setFavoritesCount ] = useState(0);
  const BC_URL = import.meta.env.VITE_BC_URL;

  const handleIconClick = () => {
    if(!Object.keys(userData) || !accessToken) {
      navigate('/login')
    } else {
      navigate('/movies')
    }
    
  };

  const fetchAPI = async (subpath, controller) => {
    try {
      const response = await fetch(`${BC_URL}/${subpath}/${userData?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        signal: controller.signal
      })

      if(!response.ok) {
        const errData = await response.json();
        const errMsg = errData.message || errData.statusText;
        throw new Error(errMsg);
      }
      
      const data = await response.json();
      return data;

    } catch (error) {
      navigate(0);
      alert(error.message)
    }

  };

  useEffect(() => {
    const controller = new AbortController();
    if(Object.keys(userData) && accessToken) {
      const fetchAll = async () => {
        const watchlists = await fetchAPI('watchlist', controller);
        const favorites = await fetchAPI('favorites', controller);

        setWatchlistCount(watchlists.watchlist.length);
        setFavoritesCount(favorites.favorites.length);
      }
      fetchAll();
    }
    return () => {
      controller.abort();
    }
  }, [userData, accessToken])

  return (
    <header id="header" className="sticky top-0 py-5 z-40 bg-black">
      <div className="container flex flex-wrap items-center justify-between gap-5 text-white">
        {/* Nav Header */}
        <HeaderNav />

        {/* Search Bar */}
        <SearchBar />

        {/* WATCHLIST AND FAVORITES */}
        <div className="flex items-center gap-4 text-white text-xl">
          <span onClick={handleIconClick} className="relative group flex">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-yellow-500 group-hover:hidden"
            />
            <i className="fas fa-bookmark hidden group-hover:block text-yellow-500"></i>
            <p className="text-xs absolute top-8 group-hover:opacity-100 left-0 opacity-0 transition-all">
              Add To Watchlist
            </p>
            {(Object.keys(userData).length > 0 && accessToken) && <p className="absolute text-xs -right-1 -top-2">{watchlistCount}</p>}
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
            {(Object.keys(userData).length > 0 && accessToken) && <p className="absolute text-xs -right-1 -top-2">{favoritesCount}</p>}
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
