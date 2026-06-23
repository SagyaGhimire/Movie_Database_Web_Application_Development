function Navbar() {
  return (
    <nav className="bg-black text-white p-4">
      <ul className="flex gap-6">
        <li className="cursor-pointer">Browse</li>
        <li className="cursor-pointer">Watchlist</li>
        <li className="cursor-pointer">Add Movie</li>
      </ul>
    </nav>
  );
}

export default Navbar;