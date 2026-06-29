
export default function Button({data='Add New Movie', onClick}) {
  return (
    <button onClick={onClick}>
      <h2 className="text-xl font-bold text-gray-800">Browse Card {data}</h2>
    </button>
  );
}

