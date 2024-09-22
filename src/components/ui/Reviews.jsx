import { useEffect, useRef, useState } from "react";
import HeaderTitle from "../common/HeaderTitle";
import dayjs from "dayjs";
import { formatRatings } from "../../utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Reviews = ({ filmType, showId }) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [reviews, setReviews] = useState([]);
  const [limitedReviews, setLimitedReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullReview, setFullReview] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (filmType && showId) {
      const getReviews = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/${filmType}/${showId}/reviews`,
            {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              signal: controller.signal,
            }
          );

          if (!response.ok) {
            const errData = await response.json();
            const errMsg = errData.message || errData.statusText;
            throw new Error(errMsg);
          }
          const data = await response.json();
          setReviews(data.results);
          setError(null);
        } catch (error) {
          setError(error.message);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      getReviews();
    }

    return () => {
      controller.abort();
    };
  }, [filmType, showId]);

  useEffect(() => {
    if (reviews.length > 0 && !isLoading && !error) {
      if (reviews.length > 3) {
        setLimitedReviews(reviews.slice(0, 3));
      } else {
        setLimitedReviews(reviews);
      }
    }
  }, [reviews, isLoading, error]);

  return (
    <div className="flex flex-col gap-5">
      <HeaderTitle title="Reviews" />

      <div id="review_container" className="flex flex-col gap-10">
        {isLoading && <p>Loading</p>}
        {error && <p>Failed To Fetch</p>}
        {limitedReviews.length > 0 &&
          limitedReviews.map((review) => (
            <div key={review.id} className="flex gap-8">
              <div id="avatar_poster" className="h-40 w-40 shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                  alt="Avatar Photo"
                  className="h-full w-full rounded-full text-center"
                />
              </div>

              <div id="review_details" className="flex flex-col gap-2">
                <h1 id="author_name">{review.author}</h1>
                <p id="last_updated">
                  {dayjs(review.updated_at).format("MM/DD/YYYY")}
                </p>
                <p id="review" className="cursor-pointer">
                  {fullReview ? (
                    <span onClick={() => setFullReview(false)}>
                      {review.content}
                    </span>
                  ) : (
                    <>
                      <span onClick={() => setFullReview(true)}> 
                        {review.content.slice(0, 150)}
                        <span className="text-red-500"> See More...</span>
                      </span>
                    </>
                  )}
                </p>

                <p id="rating" className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                  {formatRatings(review.author_details.rating)}
                </p>
              </div>
            </div>
          ))}

        {limitedReviews.length <= 3 && (
          <button
            onClick={() => setLimitedReviews(reviews)}
            className="bg-red-700 self-center px-10 py-2 rounded-lg text-nowrap hover:bg-light-red duration-200"
          >
            View All
          </button>
        )}

        {limitedReviews.length > 3 && (
          <button
          onClick={() => setLimitedReviews(reviews.slice(0, 3))}
          className="bg-red-700 self-center px-10 py-2 rounded-lg text-nowrap hover:bg-light-red duration-200"
        >
          View Less
        </button>
        )}
      </div>
    </div>
  );
};

export default Reviews;
