import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

const SmallTitle = ({ title, section }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-white font-semibold text-xl tracking-wider">{title}</h1>

      <div id="slider-btns" className="flex items-center text-lg gap-2">
        <FontAwesomeIcon className={`${section} prev-btn`} icon={faChevronLeft}/>
        <FontAwesomeIcon className={`${section} next-btn`} icon={faChevronRight}/>
      </div>
    </div>
  )
}

export default SmallTitle