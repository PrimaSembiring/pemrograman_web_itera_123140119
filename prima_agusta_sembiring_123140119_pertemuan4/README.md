# 🎓 Program Pengelolaan Data Nilai Mahasiswa

## Deskripsi  
Program ini dibuat untuk memenuhi **Tugas Praktikum Python Dasar** dalam mata kuliah *Pemrograman Web Backend (Python)*.  
Aplikasi ini dirancang menggunakan **Jupyter Notebook** dan **Python 3.13.7**,  
dengan tujuan untuk mengelola data nilai mahasiswa secara interaktif — termasuk perhitungan nilai akhir, penentuan grade, serta analisis data mahasiswa.

---
## Spesifikasi Tugas

### Persyaratan Data  
- Data mahasiswa diambil dari file **`data_mahasiswa.xlsx`**.  
- File tersebut berisi minimal 5 data mahasiswa.  
- Setiap mahasiswa memiliki atribut:
  - `nama`
  - `nim`
  - `nilai_uts`
  - `nilai_uas`
  - `nilai_tugas`

---

## Fitur Utama Program

### 1️⃣ **Hitung Nilai Akhir**
Rumus:
```
Nilai Akhir = (0.3 * Nilai UTS) + (0.4 * Nilai UAS) + (0.3 * Nilai Tugas)
```

### 2️⃣ **Tentukan Grade Mahasiswa**
| Grade | Kriteria |
|:------:|:----------:|
| A | ≥ 80 |
| B | ≥ 70 |
| C | ≥ 60 |
| D | ≥ 50 |
| E | < 50 |

### 3️⃣ **Tampilkan Data dalam Format Tabel**
Menampilkan seluruh data mahasiswa dalam bentuk tabel (via pandas DataFrame di Jupyter).

### 4️⃣ **Cari Mahasiswa Nilai Tertinggi & Terendah**
Menampilkan:
- Nama
- NIM
- Nilai Akhir
- Grade

### 5️⃣ **Input Data Mahasiswa Baru**
User dapat menambahkan data baru langsung melalui input di terminal Jupyter Notebook.  
Setelah data baru dimasukkan, **program otomatis memperbarui (update) file Excel `data_mahasiswa.xlsx`** tanpa perlu menulis ulang secara manual.

### 6️⃣ **Filter Berdasarkan Grade**
Menampilkan daftar mahasiswa sesuai grade yang dipilih (misal: A, B, C, dst).

### 7️⃣ **Hitung Rata-Rata Nilai Kelas**
Menghitung nilai rata-rata dari seluruh mahasiswa dalam kelas.

---

## Lingkungan Pengembangan

| Komponen | Keterangan |
|:--|:--|
| **Bahasa** | Python 3.13.7 |
| **Lingkungan** | Jupyter Notebook |
| **Editor** | Visual Studio Code |
| **Library Utama** | pandas |
| **Format File Data** | .xlsx (Excel) |

---

## Instalasi & Persiapan

1️⃣ **Pastikan Python sudah terinstal**
```bash
python --version
```
(hasil: `Python 3.13.7`)

2️⃣ **Instal Jupyter Notebook (jika belum ada)**
```bash
pip install notebook
```

3️⃣ **Instal library pandas**
```bash
pip install pandas openpyxl
```

4️⃣ **Buka Jupyter Notebook**
```bash
jupyter notebook
```

5️⃣ **Jalankan file `main.ipynb`**

---

## Cara Menjalankan Program

1. Jalankan semua sel fungsi (`nilai_akhir`, `tentukan_grade`, `tambah_data`, dll).  
2. Jalankan sel utama yang berisi:
   ```python
   # Tambah data baru
   df_data = tambah_data(df_data)

   # Cari nilai tertinggi dan terendah
   cari_tertinggi_terendah(df_data)

   # Update nilai dan grade
    display(df_data)


   # Simpan hasil ke Excel
   df_data.to_excel('data_mahasiswa.xlsx', index=False)
   print("Data baru berhasil disimpan ke file Excel!")
   ```
3. Setelah menjalankan kode di atas, file **`data_mahasiswa.xlsx` akan otomatis diperbarui** dengan data mahasiswa terbaru yang diinput.

---

## Hasil File Excel

### **Sebelum Input Data Baru**
File Excel berisi data awal 10 mahasiswa:
![Data Awal](assets/0b4cdf4e-b260-4c8d-84b9-a0afb5ca5065.png)

### **Setelah Input Data Baru**
Setelah menjalankan program dan menambah dua mahasiswa baru (`Sugeng` dan `Tongat`), file Excel otomatis diperbarui seperti berikut:
![Data Setelah Update](assets/6af67436-a79e-4fa0-b313-cd2e2ac5efa5.png)
