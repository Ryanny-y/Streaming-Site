import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header id='header' className='fixed top-0 right-0 left-0 py-5'>
      <div className="container flex items-center justify-between gap-10">
        {/* NAVIGATION HEADER */}
        <nav id="header-nav">
          <ul className="flex items-center gap-4 text-white">
            <li>Home</li>
            <li>Movies</li>
            <li>TV Series</li>
            <li>Genre</li>
            <li>Country</li>
          </ul>
        </nav>

        {/* SEARCH BAR */}
        <div id="search-bar" className='bg-white rounded-full relative px-5 py-2 gap-2 grow flex items-center justify-between'>
          <input type="text" name="search" id="search" className='bg-transparent outline-none text-sm w-full' placeholder="Search Show."/>
          <FontAwesomeIcon icon={faMagnifyingGlass} />  
        </div>

        {/* LOGIN/REGISTER */}
        <div className="buttons text-white flex items-center gap-3 font-semibold">
          <button className="text-red-500 px-5 py-1 rounded-full hover:text-white duration-200">Login</button>
          <button className="bg-red-700 px-5 py-1 rounded-full hover:bg-light-red duration-200">Register</button>
        </div>

      </div>
    </header>
  )
}

export default Header