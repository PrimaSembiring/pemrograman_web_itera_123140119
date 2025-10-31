import { useBooks } from "../context/BookContext";

export default function useBookStats() {
  const { books } = useBooks();

  const total = books.length;
  const punya = books.filter((b) => b.status === "punya").length;
  const baca = books.filter((b) => b.status === "baca").length;
  const beli = books.filter((b) => b.status === "beli").length;

  return { total, punya, baca, beli };
}
