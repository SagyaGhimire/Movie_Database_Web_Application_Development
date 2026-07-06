import star from "../assets/star.svg";

{/*This is the MovieCard component(function) which is used to display the movie details in a card format*/}
function MovieCard(props) {

  {/*This part is for initializing the badge color based on the rating value*/}
  let badgeColor = "";

  {/*This part is for the rating color based on the rating value*/}
  if (props.rating >= 8) {
    badgeColor = "bg-green-200";
  } else if (props.rating >= 5) {
    badgeColor = "bg-amber-200";
  } else {
    badgeColor = "bg-red-300";
  }

  return (
  <div className="bg-stone-100 p-4 w-96 border rounded flex gap-4">

    {/* This is for the Poster part for now later i will replace it with an actual image */}
    <div className="h-40 w-28 bg-stone-300 flex items-center justify-center">
      Poster
    </div>

    {/* This section is for the Movie Details */}
    <div>
      <h2 className="text-xl font-bold text-gray-800">
        {props.title}
      </h2>

      <p className="text-gray-600">
        Genre: {props.genre}
      </p>

      <p className="text-gray-600">
        Year: {props.year}
      </p>

      {/* This is for the rating part where an svg image of star is used */}
      <span
        className={`${badgeColor} mt-3 px-3 py-2 rounded inline-flex items-center gap-2`}
      >
        <img src={star} alt="Star" className="w-4 h-4" /> 
        Rating: {props.rating}
      </span>
    </div>

  </div>
);
}
export default MovieCard;