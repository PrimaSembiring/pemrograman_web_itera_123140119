from abc import ABC, abstractmethod

# Abstract class item perpustakaan
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    @property
    def title(self):
        return self._title

    @abstractmethod
    def display_info(self):
        pass


# Subclass Book
class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author  # private supaya tdk diubah 

    def display_info(self):
        print(f"[BOOK] ID: {self._item_id} | Judul: {self._title} | Penulis: {self.__author}")


# Subclass Magazine
class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue):
        super().__init__(item_id, title)
        self._issue = issue  # protected

    def display_info(self):
        print(f"[MAGAZINE] ID: {self._item_id} | Judul: {self._title} | Edisi: {self._issue}")


# Class Library
class Library:
    def __init__(self):
        self.__items = []  # private list

    def add_item(self, item):
        self.__items.append(item)
        print("Item ditambahkan.")

    def show_all_items(self):
        if not self.__items:
            print("Perpustakaan kosong.")
            return
        print("\n=== Daftar Item ===")
        for item in self.__items:
            item.display_info()
        print()

    def search_item(self, keyword):
        print(f"\nPencarian: {keyword}")
        found = False
        for item in self.__items:
            if keyword.lower() in item.title.lower() or keyword == str(item._item_id):
                item.display_info()
                found = True
        if not found:
            print("Tidak ditemukan.\n")


#penggunaanya
if __name__ == "__main__":
    lib = Library()

    buku1 = Book(101, "Pemrograman Python", "Sembiring")
    buku2 = Book(102, "Machine Learning", "Prima")
    m1 = Magazine(201, "Deep Learning", "Edisi Juli 2020")

    lib.add_item(buku1)
    lib.add_item(buku2)
    lib.add_item(m1)

    lib.show_all_items()
    lib.search_item("Python")
    lib.search_item("201")
