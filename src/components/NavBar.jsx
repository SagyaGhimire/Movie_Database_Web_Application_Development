
{/*This is the NavBar component(function) which is used to display the navigation bar*/}
function NavBar() {

  {/*This section is for the navigation bar which contains the title and the links to different pages*/}
  return (
    <nav>
      <h1 className="text-2xl font-bold text-gray-800 text-center">Movie Database</h1>

      {/*This section is for the links to different pages Browse, Watchlist and Add_Movie*/}
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

