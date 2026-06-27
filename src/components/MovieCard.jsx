function MovieCard(props) {

  let badgeColor = "";

  if (props.rating >= 8) {
    badgeColor = "bg-green-200";
  } else if (props.rating >= 5) {
    badgeColor = "bg-amber-100";
  } else {
    badgeColor = "bg-red-300";
  }

  return (
    <div className="bg-stone-100 shadow-md p-4 w-64 border border-stone-300">

      {/* Poster Placeholder */}
      <div className="h-40 bg-stone-300 flex items-center justify-center mb-4">
        Poster
      </div>

      <h2 className="text-xl text-gray-800 font-bold">{props.title}</h2>

      <p className="text-gray-600">Genre of Movie: {props.genre}</p>

      <p className="text-gray-600">Year of Release: {props.year}</p>

      {/* Rating Badge */}
      <span
        className={`${badgeColor} text-gray-800 px-3 py-1 rounded-full font-semibold inline-block mt-2`}
      >
      Rating: {props.rating}
      </span>

    </div>
  );
}

export default MovieCard;