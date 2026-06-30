import { useState } from "react";

import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import Watchlist from "./components/Watchlist";
import AddMovie from "./components/AddMovie";
import Browse from "./components/Browse";

function App() {

  const [page, setPage] = useState("browse");

  return (
    <div className="min-h-screen bg-[#DBDFEA]">

      <NavBar setPage={setPage} />
      {page === "browse" && <Browse />}
      {page === "watchlist" && <Watchlist />}
      {page === "add" && <AddMovie />}

    </div>
  );
}

export default App;