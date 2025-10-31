import { useBooks } from "../context/BookContext";

export default function BookFilter() {
  const { filter, setFilter } = useBooks();

  return (
    <div className="filter-section">
      <h3>Filter Buku</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="semua">Semua</option>
        <option value="punya">Punya</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>
    </div>
  );
}
