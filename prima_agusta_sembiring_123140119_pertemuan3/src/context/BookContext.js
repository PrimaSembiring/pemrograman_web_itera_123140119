import { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();

// simpan data buku di localStorage
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null); // 🔧 buku yang sedang diedit

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => setBooks([...books, book]);
  const deleteBook = (id) => setBooks(books.filter((b) => b.id !== id));

  const updateBook = (updated) =>
    setBooks(books.map((b) => (b.id === updated.id ? updated : b)));

  const startEdit = (book) => setEditingBook(book); // buka mode edit
  const finishEdit = () => setEditingBook(null); // keluar mode edit

  // filter + pencarian
  const filteredBooks = books.filter((b) => {
    const matchFilter =
      filter === "semua" || b.status.toLowerCase() === filter.toLowerCase();

    const matchSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <BookContext.Provider
      value={{
        books,
        addBook,
        deleteBook,
        updateBook,
        startEdit,
        finishEdit,
        editingBook,
        filter,
        setFilter,
        searchTerm,
        setSearchTerm,
        filteredBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
