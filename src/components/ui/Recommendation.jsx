import { useEffect, useState } from "react";
import HeaderTitle from "../common/HeaderTitle";
import MovieCardNoBg from "./MovieCardNoBg";
import SeriesCardNoBg from './SeriesCardNoBg'

const Recommendation = ({ filmType, showId }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [recommendations, setRecommendations] = useState([]);

  // GET RECOMMENDATIOn
  useEffect(() => {
    if (filmType && showId) {
      const getRecommendations = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/${filmType}/${showId}/recommendations`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(response);
          }

          const data = await response.json();
          setRecommendations(data.results.slice(0, 8));
        } catch (error) {
          console.log(error);
        }
      };

      getRecommendations();
    }
  }, [showId, filmType]);

  return (
    <div className="flex flex-col gap-5">
      <HeaderTitle title="You May Also Like" />

      <div id="recommendation_wrapper">
        {recommendations.length > 0 ? (
          recommendations.map((recommendation) => ( 
            filmType === "movie" ? (
              <MovieCardNoBg
                key={recommendation.id}
                movieId={recommendation.id}
              />
            ) : (
              <SeriesCardNoBg 
                key={recommendation.id}
                seriesId={recommendation.id}
              />
            )
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
