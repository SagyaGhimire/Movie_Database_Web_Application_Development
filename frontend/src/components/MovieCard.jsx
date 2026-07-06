import star from "../assets/star.svg";

/* This is the MovieCard component(function) which is used to display the movie details in a card format */
function MovieCard({ movie, setSelectedMovie }) {

  /* This part is for initializing the badge color based on the rating value */
  let badgeColor = "";

  /* This part is for the rating color based on the rating value */
  if (movie.rating >= 8) {
    badgeColor = "bg-green-200";
  } else if (movie.rating >= 5) {
    badgeColor = "bg-amber-200";
  } else {
    badgeColor = "bg-red-300";
  }

  return (

    <div
      onClick={() => setSelectedMovie(movie)}
      className="bg-stone-100 p-4 border rounded flex gap-4 cursor-pointer hover:shadow-lg transition"
    >

      {/* This is for displaying the movie poster */}
      <img
       src={movie.poster}
       alt={movie.title}
       className="h-40 w-28 object-cover rounded"/>

      {/* This section is for the Movie Details */}
      <div className="flex flex-col justify-between">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            {movie.title}
          </h2>

          <p className="text-gray-600">
            Genre: {movie.genre}
          </p>

          <p className="text-gray-600">
            Year: {movie.year}
          </p>

          <p className="text-gray-600">
            Director: {movie.director}
          </p>

        </div>

        {/* This is for the rating part where an svg image of star is used */}
        <span
          className={`${badgeColor} mt-3 px-3 py-2 rounded inline-flex items-center gap-2 w-fit`}
        >
          <img src={star} alt="Star" className="w-4 h-4" />

          Rating: {movie.rating}
        </span>

      </div>

    </div>

  );
}

export default MovieCard;