import useBookStats from "../hooks/useBookStats";

export default function Stats() {
  const { total, punya, baca, beli } = useBookStats();

  // tampilkan statistik buku
  return (
    <div className="container">
      <h2>Statistik Koleksi Buku</h2>
      <div className="stats-grid">
        <div className="stats-box">
          Total Buku
          <span>{total}</span>
        </div>
        <div className="stats-box">
          Punya
          <span>{punya}</span>
        </div>
        <div className="stats-box">
          Sedang Dibaca
          <span>{baca}</span>
        </div>
        <div className="stats-box">
          Ingin Dibeli
          <span>{beli}</span>
        </div>
      </div>
    </div>
  );
}
