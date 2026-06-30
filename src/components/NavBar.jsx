function NavBar({ setPage }) {
  return (
    <nav className="bg-[#AACDDC] p-5 flex justify-between items-center shadow-md">

      <h1 className="text-3xl font-bold text-gray-800">
        Movie Database
      </h1>

      <div className="flex gap-6">

        <button
          onClick={() => setPage("browse")}
          className="text-gray-800 font-semibold hover:text-[#81A6C6]"
        >
          Browse
        </button>

        <button
          onClick={() => setPage("watchlist")}
          className="text-gray-800 font-semibold hover:text-[#81A6C6]"
        >
          Watchlist
        </button>

        <button
          onClick={() => setPage("add")}
          className="text-gray-800 font-semibold hover:text-[#81A6C6]"
        >
          Add Movie
        </button>

      </div>

    </nav>
  );
}

export default NavBar;