function MovieCard(props) {
  return (
    <div className="card">
      <div className="poster">
        Poster
      </div>

      <h2>{props.title}</h2>

      <p>Genre: {props.genre}</p>

      <p>Year: {props.year}</p>

      <span>{props.rating}</span>
    </div>
  );
}

export default MovieCard;