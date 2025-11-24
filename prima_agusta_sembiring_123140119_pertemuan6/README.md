# Aplikasi Manajemen Matakuliah – Pyramid Framework

## Deskripsi Proyek

Aplikasi ini merupakan API sederhana untuk mengelola data **Matakuliah** menggunakan **Pyramid Framework**, **PostgreSQL**, **SQLAlchemy**, dan **Alembic**. Fitur utama yang tersedia adalah CRUD (Create, Read, Update, Delete) untuk data matakuliah.

### Model Matakuliah

Model ini memiliki atribut berikut:

- `id` (Integer, Primary Key)
- `kode_mk` (Text, Unique, Not Null)
- `nama_mk` (Text, Not Null)
- `sks` (Integer, Not Null)
- `semester` (Integer, Not Null)

---

## Cara Instalasi

### 1. Membuat Virtual Environment

**Windows:**
```bash
python -m venv env
env\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv env
source env/bin/activate
```

### 2. Install Dependensi
```bash
pip install -r requirements.txt
pip install -e .
```

### 3. Konfigurasi Database

Edit file `development.ini` dan sesuaikan connection string database:
```ini
sqlalchemy.url = postgresql://postgres:1234@localhost:5432/pyramiddb
```

> **Penting:** Pastikan database bernama `pyramiddb` sudah dibuat di PostgreSQL sebelum melanjutkan langkah berikutnya.

---

## Cara Menjalankan Aplikasi

### 1. Menjalankan Migrasi (Membuat Tabel)

Jalankan perintah berikut untuk menerapkan skema database:
```bash
alembic upgrade head
```

Jika berhasil, tabel `matakuliah` akan muncul di database.

### 2. Menjalankan Server Pyramid

Jalankan server dalam mode development (reload otomatis):
```bash
pserve development.ini --reload
```

Server akan berjalan pada: **http://localhost:6543**

---

## API Endpoints

### 1. Get All Matakuliah

- **Method:** `GET`
- **URL:** `http://localhost:6543/api/matakuliah`

**Response:**
```json
{
  "matakuliahs": [
    {
      "id": 1,
      "kode_mk": "IF101",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    }
  ]
}
```

---

### 2. Get Matakuliah by ID

- **Method:** `GET`
- **URL:** `http://localhost:6543/api/matakuliah/{id}`

**Response:**
```json
{
  "id": 1,
  "kode_mk": "IF101",
  "nama_mk": "Algoritma dan Pemrograman",
  "sks": 3,
  "semester": 1
}
```

---

### 3. Create Matakuliah

- **Method:** `POST`
- **URL:** `http://localhost:6543/api/matakuliah`

**Body (JSON):**
```json
{
  "kode_mk": "IF102",
  "nama_mk": "Struktur Data",
  "sks": 3,
  "semester": 2
}
```

**Response:**
```json
{
  "message": "Matakuliah berhasil ditambahkan",
  "data": {
    "id": 2,
    "kode_mk": "IF102",
    "nama_mk": "Struktur Data",
    "sks": 3,
    "semester": 2
  }
}
```

---

### 4. Update Matakuliah

- **Method:** `PUT`
- **URL:** `http://localhost:6543/api/matakuliah/{id}`

**Body (JSON):**
```json
{
  "nama_mk": "Struktur Data Lanjut",
  "semester": 3
}
```

**Response:**
```json
{
  "message": "Matakuliah berhasil diperbarui",
  "data": {
    "id": 2,
    "kode_mk": "IF102",
    "nama_mk": "Struktur Data Lanjut",
    "sks": 3,
    "semester": 3
  }
}
```

---

### 5. Delete Matakuliah

- **Method:** `DELETE`
- **URL:** `http://localhost:6543/api/matakuliah/{id}`

**Response:**
```json
{
  "message": "Matakuliah berhasil dihapus"
}
```

---

## Testing Manual (Curl)

Anda dapat menyalin perintah di bawah ini ke terminal untuk menguji API secara cepat.

### Test GET All
```bash
curl -X GET http://localhost:6543/api/matakuliah
```

### Test GET by ID
```bash
curl -X GET http://localhost:6543/api/matakuliah/1
```

### Test POST (Tambah Data)
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{"kode_mk":"IF201","nama_mk":"Jaringan Komputer","sks":3,"semester":3}'
```

### Test PUT (Update Data)
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{"nama_mk":"Pemrograman Lanjut"}'
```

### Test DELETE (Hapus Data)
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/1
```

---

## Catatan

- Pastikan PostgreSQL sudah terinstall dan berjalan
- Sesuaikan username, password, dan nama database di `development.ini`
- Untuk production, gunakan `production.ini` dan pastikan konfigurasi keamanan sudah sesuai
