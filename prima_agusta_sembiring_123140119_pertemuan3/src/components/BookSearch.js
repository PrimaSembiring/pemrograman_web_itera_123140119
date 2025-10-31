import { useBooks } from "../context/BookContext";

export default function BookSearch() {
  const { searchTerm, setSearchTerm } = useBooks();

  // input pencarian buku
  return (
    <div className="search-bar">
      <span className="search-icon"></span>
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
