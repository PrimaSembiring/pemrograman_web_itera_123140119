import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";

export default function BookForm() {
  const { addBook, updateBook, editingBook, finishEdit } = useBooks();
  const [form, setForm] = useState({ title: "", author: "", status: "punya" });

  // isi otomatis kalau sedang edit
  useEffect(() => {
    if (editingBook) setForm(editingBook);
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      alert("Data tidak boleh kosong");
      return;
    }

    // simpan edit atau tambah baru
    if (editingBook) {
      updateBook(form);
      finishEdit();
    } else {
      addBook({ ...form, id: Date.now() });
    }

    setForm({ title: "", author: "", status: "punya" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Judul Buku"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Penulis"
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="punya">Punya</option>
        <option value="baca">Sedang Dibaca</option>
        <option value="beli">Ingin Dibeli</option>
      </select>

      <button type="submit" style={{ marginLeft: "10px" }}>
        {editingBook ? "Simpan Perubahan" : "Tambah Buku"}
      </button>
      {editingBook && (
        <button
          type="button"
          onClick={finishEdit}
          style={{
            marginLeft: "10px",
            backgroundColor: "#ef4444",
            color: "white",
          }}
        >
        Batal
        </button>
      )}
    </form>
  );
}
