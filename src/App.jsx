import NavBar from "./components/NavBar";
import MovieGrid from "./components/MovieGrid";
import AddMovie from "./components/AddMovie";

{/*This is the App component(function) which is used to display the NavBar and MovieGrid components*/}
function App() {
  return (
    <div>
      <NavBar />
      <MovieGrid />
      <AddMovie />
    </div>
  );
}

export default App;