# CRUD API dengan Node.js

Proyek ini adalah aplikasi CRUD (Create, Read, Update, Delete) sederhana menggunakan JavaScript dan Node.Js.

## Fitur
- **Create**: Menambahkan data baru.
- **Read**: Mengambil dan menampilkan data.
- **Update**: Memperbarui data yang sudah ada.
- **Delete**: Menghapus data.

## Teknologi yang Digunakan
- **Node.js**
- **Node.js**

## Instalasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/clarck77/repo-crud-nodejs.git
   cd CreateReadUpdateAndDelete
   ```

2. **Install dependencies:**
   ```bash
   npm install @hapi/hapi
   ```

3. **Konfigurasi file `.env`:**
   ```env
   PORT=9000
   ```

4. **Jalankan server:**
   ```bash
   npm run start
   ```
   API akan berjalan di `http://localhost:9000`

## Endpoint API

- **GET /items** → Menampilkan semua data.
- **GET /items/:id** → Menampilkan data berdasarkan ID.
- **POST /items** → Menambahkan data baru.
- **PUT /items/:id** → Memperbarui data berdasarkan ID.
- **DELETE /items/:id** → Menghapus data berdasarkan ID.

## Struktur Folder
```
├── books
│   └── books.controller.js
│   └── books.data.js
│   └── books.service.js
├── libs
├── config
│   └── environments.js
├── server.js
├── .env
```

## Lisensi
Proyek ini tidak menggunakan lisensi.


