import GenreCard from "./GenreCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faStar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import { formatDuration, formatRatings } from "../../utils/formatter";

const ShowDetails = ({ details, filmType }) => {
  return (
    <div id="show_details" className="flex gap-5">

      <div id="show_poster" className="basis-72 shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
          alt="Show Poster"
          className="bg-blue-200 w-full h-80"
        />
      </div>

      <div className="flex flex-col gap-5 basis-2/5 grow">
        {/* SHOW TITLE */}
        <h1 className="text-3xl tracking-wide font-semibold">
          {filmType === "movie"
            ? `${details.original_title}`
            : `${details.name}`}
        </h1>

        {/* GENRE AND TIME */}
        <div
          id="genres_time"
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <div
            id="genres"
            className="flex items-center flex-wrap gap-2 text-nowrap"
          >
            {details?.genres?.slice(0, 3)?.map((genre) => (
              <GenreCard key={genre.id} genre={genre.name} />
            ))}
          </div>

          <div
            id="date_time_ratings"
            className="flex items-center gap-2 flex-wrap"
          >
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendarDays} />
              <span>{dayjs(details.release_date).format("YYYY")}</span>
            </p>
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} />
              {filmType === "movie" ? (
                <span>{formatDuration(details.runtime)}</span>
              ) : (
                <span>
                  Series/S {details.number_of_seasons}/EP{" "}
                  {details.number_of_episodes}
                </span>
              )}
            </p>
            <p className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <span>{formatRatings(details.vote_average)}</span>
            </p>
          </div>
        </div>

        {/* SHOW PLOT */}
        <p id="plot">{details.overview}</p>

        {/* OTHER DETAILS */}
        <div id="other_details" className="pl-3 flex flex-col gap-1 text-sm">
          <p className="flex items-start gap-1">
            Country:
            <span>
              {details.production_countries
                .map((country) => country.name)
                .join(", ")}
            </span>
          </p>
          <p className="flex items-start gap-1">
            Genre:
            <span className="flex items-center gap-1">
              {details.genres
                .slice(0, 3)
                .map((genre) => genre.name)
                .join(", ")}
            </span>
          </p>
          <p className="flex items-start gap-1">
            Date Released:
            <span>{dayjs(details.release_date).format("MM/DD/YY")}</span>
          </p>
          <p className="flex items-start gap-1">
            Production:
            <span>
              {details.production_companies
                .map((production) => production.name)
                .join(", ")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
