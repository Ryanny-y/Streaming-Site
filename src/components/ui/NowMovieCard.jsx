const NowMovieCard = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="movie_poster">
        <img
          src="images/borderlands.jpeg"
          alt="Movie Poster"
          className="h-20 w-20 object-contain"
          loading="lazy"
        />
      </div>
      <div id="movie_details" className="text-sm">
        <h1 id="title">Borderlands</h1>
        <p id="production">Movie</p>
        <p>08/07/24</p>
      </div>
    </div>
  );
};

export default NowMovieCard;
