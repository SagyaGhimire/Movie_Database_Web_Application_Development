function NavBar() {
  return (
    <nav>
      <h1 className="text-2xl font-bold text-gray-800 text-center">Movie Database</h1>

      <div className="flex gap-6 justify-center space-x-4 mt-4 text-gray-800">
        <a href="#" className="font-semibold text-gray-700 font-medium hover:text-stone-500 transition-colors">
          Browse
        </a>
        
        <a href="#" className="font-semibold text-gray-700 font-medium hover:text-stone-500 transition-colors">
          Watchlist
        </a>

        <a href="#" className="font-semibold text-gray-700 font-medium hover:text-stone-500 transition-colors">
          Add Movie
        </a>
      </div>

    </nav>
  );
}

export default NavBar;

