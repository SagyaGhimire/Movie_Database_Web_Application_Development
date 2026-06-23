function MovieCard() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src="saiya.jpg" alt="Saiyaara" className="w-full h-auto" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Saiyaara</h2>
        <p className="text-gray-600 mb-1">Love Romance</p>
        <p className="text-gray-500">2025</p>
        <span className="text-lg font-bold text-yellow-500">9</span>
      </div>
    </div>
  );
}