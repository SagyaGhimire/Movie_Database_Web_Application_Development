
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <h1 className="text-3xl font-bold text-center mt-6">
        Movie Database
      </h1>

      <MovieGrid />
    </div>
  );
}

export default App;