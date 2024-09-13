import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

const SeriesCard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div id="image_poster">
        <img src="images/borderlands.jpeg" alt="Image Poster" className="h-80 w-full" />
      </div>

      <h1 id="title" className="text-xl font-semibold tracking-wide">Borderlands</h1>

      <div id="rating_time" className="flex items-center gap-4 text-sm">
        <p>
          <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
          <span className="ml-1">8.8</span>
        </p>
        <p>
          Series/S 11/EP 152
        </p>
      </div>
    </div>
  )
}

export default SeriesCard