import star from "../assets/star.svg";
function MovieCard(props) {

  let badgeColor = "";

  if (props.rating >= 8) {
    badgeColor = "bg-green-200";
  } else if (props.rating >= 5) {
    badgeColor = "bg-amber-200";
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
        className={`${badgeColor} text-gray-800 px-3 py-1 rounded-md font-semibold inline-flex flex-col items-center justify-center mt-2`}
         
      >
       <img src={star} alt="Star" className="w-4 h-4 mb-1" />
       Rating: {props.rating}
      </span>

    </div>
  );
}

export default MovieCard;