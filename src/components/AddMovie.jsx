import { useState } from "react";
function AddMovie() {

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  
 return (
  <form>
  <div className="bg-[#D2C4B4] p-6 w-96 border border-[#D2C4B4] rounded">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      Add New Movie
    </h2>

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

    <div className="mb-4">
      <label className="block text-gray-700 mb-1">
        Rating:
      </label>
      <input
        type="number"
        step="0.1"
        min="0"
        max="10"
        placeholder="Enter the rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full border border-[#D2C4B4] rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#81A6C6]"
      />
    </div>

    <button
      type="submit"
      className="bg-[#AACDDC] text-gray-800 px-4 py-2 rounded hover:bg-[#81A6C6]"
    >
      Add Movie
    </button>

    <button
      type="button"
      className="bg-[#D2C4B4] text-gray-800 px-4 py-2 rounded hover:bg-[#AACDDC] ml-2"
    >
      Cancel
    </button>
  </div>
</form>
  );
}
export default AddMovie;