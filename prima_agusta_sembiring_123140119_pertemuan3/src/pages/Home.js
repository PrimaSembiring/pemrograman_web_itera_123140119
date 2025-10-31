import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import BookFilter from "../components/BookFilter";
import BookSearch from "../components/BookSearch";

// gabungan semua komponen utama di halaman utama
export default function Home() {
  return (
    <div className="container">
      <h1>Manajemen Buku Pribadi</h1>
      <BookForm />
      <BookSearch /> {/* Cari Buku */}
      <BookFilter />
      <BookList />
    </div>
  );
}
