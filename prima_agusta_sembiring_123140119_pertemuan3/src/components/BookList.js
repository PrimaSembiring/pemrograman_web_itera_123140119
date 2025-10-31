import { useBooks } from "../context/BookContext";

export default function BookList() {
  const { filteredBooks, deleteBook, startEdit } = useBooks();

  if (filteredBooks.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "20px", color: "#9baea5" }}>
        Buku Masih Kosong
      </p>
    );

  return (
    <div>
      {filteredBooks.map((b) => (
        <div className="book-card" key={b.id}>
          <div className="book-info">
            <strong>{b.title}</strong>
            <small>{b.author}</small>
            <span>Status: {b.status}</span>
          </div>
          <div className="book-actions">
            <button
              onClick={() => startEdit(b)}
              style={{
                backgroundColor: "#3b82f6",
                marginRight: "10px",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteBook(b.id)}
              style={{
                backgroundColor: "#928b8cff",
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
