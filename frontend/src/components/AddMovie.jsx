import { useState } from "react";

function AddMovie({ movies, setMovies, setPage }) {

  // States for controlled inputs
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [poster, setPoster] = useState("");``

  // Function to add a new movie
  function handleSubmit(e) {

    e.preventDefault();

    // Check if any field is empty
    if (
      !title ||
      !genre ||
      !year ||
      !director ||
      !rating ||
      !synopsis
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Create new movie object
    const newMovie = {
      id: movies.length + 1,
      title,
      genre,
      year: Number(year),
      director,
      rating: Number(rating),
      poster,
      synopsis,
      cast: [],
    };

    // Add movie to movies state
    setMovies([...movies, newMovie]);

    // Clear the form
    setTitle("");
    setGenre("");
    setYear("");
    setDirector("");
    setRating("");
    setSynopsis("");
    setPoster(""); 
    
    // Go back to Browse page
    setPage("browse");
  }

  return (

    <form onSubmit={handleSubmit}>

      <div className="bg-[#D2C4B4] p-6 w-[500px] mx-auto mt-8 border border-[#D2C4B4] rounded">

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add New Movie
        </h2>

        {/* Movie Title */}
        <div className="mb-3">

          <label className="block text-gray-700 mb-1">
            Movie Title:
          </label>

          <input
            type="text"
            placeholder="Enter a movie name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
          />

        </div>

        {/* Genre */}
        <div className="mb-3">

          <label className="block text-gray-700 mb-1">
            Genre:
          </label>

          <input
            type="text"
            placeholder="Enter a genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
          />

        </div>

        {/* Year */}
        <div className="mb-3">

          <label className="block text-gray-700 mb-1">
            Year:
          </label>

          <input
            type="number"
            placeholder="Enter the release year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
          />

        </div>

        {/* Director */}
        <div className="mb-3">

          <label className="block text-gray-700 mb-1">
            Director:
          </label>

          <input
            type="text"
            placeholder="Enter the director's name"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
          />

        </div>
        {/* Poster URL */}
        <div className="mb-3">
          <label className="block text-gray-700 mb-1">
             Poster URL:
             </label>
             <input
             type="text"
             placeholder="Enter poster image URL"
             value={poster}
             onChange={(e) => setPoster(e.target.value)}
             className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
             />
             </div>

        {/* Rating */}
        <div className="mb-3">

          <label className="block text-gray-700 mb-1">
            Rating:
          </label>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Enter the rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
          />

        </div>

        {/* Synopsis */}
        <div className="mb-4">

          <label className="block text-gray-700 mb-1">
            Synopsis:
          </label>

          <textarea
            rows="4"
            placeholder="Enter movie synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
          />

        </div>

        {/* Buttons */}

        <button
          type="submit"
          className="bg-[#AACDDC] text-gray-800 px-4 py-2 rounded hover:bg-[#81A6C6]"
        >
          Add Movie
        </button>

        <button
          type="button"
          onClick={() => setPage("browse")}
          className="bg-[#D2C4B4] text-gray-800 px-4 py-2 rounded hover:bg-[#AACDDC] ml-2"
        >
          Cancel
        </button>

      </div>

    </form>

  );
}

export default AddMovie;