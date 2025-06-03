# 📚 Dokumentasi Proyek Lengkap

Selamat datang di dokumentasi README.md untuk **tiga sesi** berikut:

1. **Session 1: Backend Application (`backend_app.zip`)**
2. **Session 2: Frontend React Application (`smbsuvannadipa-v1.zip`)**
3. **Session 3: Virtual Environment (`venv.zip`)**

Dokumentasi ini disusun sedemikian rupa agar mudah dipahami, lengkap dengan petunjuk instalasi, struktur folder, dan tips menarik lainnya. 🎉

---

## 📦 Daftar Isi

* [Session 1: Backend Application](#session-1-backend-application)

  * [🔎 Deskripsi Singkat](#deskripsi-singkat-1)
  * [💡 Teknologi dan Dependensi](#teknologi-dan-dependensi-1)
  * [📂 Struktur Folder](#struktur-folder-1)
  * [⚙️ Instalasi & Konfigurasi](#instalasi--konfigurasi-1)
  * [🚀 Cara Menjalankan](#cara-menjalankan-1)
  * [🧪 Testing](#testing-1)
  * [📝 Catatan Tambahan](#catatan-tambahan-1)

* [Session 2: Frontend React Application](#session-2-frontend-react-application)

  * [🔎 Deskripsi Singkat](#deskripsi-singkat-2)
  * [💡 Teknologi dan Dependensi](#teknologi-dan-dependensi-2)
  * [📂 Struktur Folder](#struktur-folder-2)
  * [⚙️ Instalasi & Konfigurasi](#instalasi--konfigurasi-2)
  * [🚀 Cara Menjalankan](#cara-menjalankan-2)
  * [📦 Build & Deployment](#build--deployment-2)
  * [📝 Catatan Tambahan](#catatan-tambahan-2)

* [Session 3: Virtual Environment](#session-3-virtual-environment)

  * [🔎 Deskripsi Singkat](#deskripsi-singkat-3)
  * [⚙️ Cara Aktivasi & Penggunaan](#cara-aktivasi--penggunaan-3)
  * [📦 Dependensi Utama](#dependensi-utama-3)
  * [📝 Catatan Tambahan](#catatan-tambahan-3)

---

## Session 1: Backend Application

### 🔎 Deskripsi Singkat

Session ini berisi **aplikasi backend** berbasis **Pyramid Framework** (Python) yang sudah dikemas dalam `backend_app.zip`.
Backend ini mencakup struktur project Pyramid standar, endpoint–endpoint API, konfigurasi testing, dan setup untuk deployment (production.ini).

---

### 💡 Teknologi dan Dependensi

* **Bahasa Pemrograman**: Python ≥ 3.10
* **Framework**: Pyramid
* **Database**: (Siapkan PostgreSQL/SQLite sesuai kebutuhan)
* **Testing**: Pytest
* **Virtual Environment**: Disarankan menggunakan `venv` (lihat Session 3)
* **Dependensi Utama** (tertera di `setup.py`):

  * `pyramid`
  * `pyramid_jinja2`
  * `pyramid_debugtoolbar`
  * `psycopg2` (jika menggunakan PostgreSQL)
  * `alembic` (opsional, untuk migrasi schema)
  * `pytest`, `pytest-cov` (untuk testing)

---

### 📂 Struktur Folder

```
backend_app/
├── .coveragerc
├── .gitignore
├── production.ini
├── testing.ini
├── pytest.ini
├── README.txt
├── setup.py
├── backend_app/                 ← Kode utama aplikasi
│   ├── __init__.py
│   ├── routes.py
│   ├── views.py
│   ├── models.py               ← (jika ORM dipakai)
│   ├── services/               ← (opsional: business logic terpisah)
│   └── static/, templates/     ← (jika ada)
│
├── backend_app.egg-info/        ← Metadata paket (otomatis)
│
├── tests/
│   ├── conftest.py             ← Fixture pytest
│   ├── test_views.py           ← Contoh unit/integrasi testing
│   └── test_functional.py      ← Contoh functional testing
│
└── .pytest_cache/               ← Cache pytest (otomatis)
```

* **`backend_app/`**:

  * `__init__.py`: Inisialisasi modul Pyramid.
  * `routes.py`: Mendaftarkan route–route API/endpoints.
  * `views.py`: Fungsi–fungsi view yang menangani permintaan HTTP.
  * `models.py`: Definisi model ORM (jika digunakan, misal SQLAlchemy).
  * `services/`: (Opsional) Logika bisnis terpisah agar views lebih ringkas.
  * `static/`, `templates/`: Asset statis dan template Jinja2 (jika diperlukan).

* **`tests/`**:

  * `conftest.py`: Fixture global (misal, membuat database sementara).
  * `test_views.py`: Unit test untuk endpoint–endpoint view.
  * `test_functional.py`: Tes end-to-end / functional (misal, menggunakan `WebTest`).

* **File Konfigurasi**:

  * `production.ini`: Konfigurasi WSGI untuk deployment (gunicorn/uWSGI, dsb.).
  * `testing.ini`: Konfigurasi khusus untuk testing (misal, database SQLite in-memory).
  * `pytest.ini`: Konfigurasi Pytest (coverage, markers, dsb.).
  * `.coveragerc`: Aturan coverage laporan.

---

### ⚙️ Instalasi & Konfigurasi

1. **Ekstrak ZIP**

   ```bash
   unzip backend_app.zip -d backend_app_project
   cd backend_app_project/backend_app
   ```

2. **Siapkan Virtual Environment** *(Opsional jika sudah pakai `venv.zip`)*

   ```bash
   python3 -m venv ../venv_backend
   source ../venv_backend/bin/activate     # Linux/Mac
   # .\..\venv_backend\Scripts\activate.bat # Windows
   ```

3. **Install Dependensi**

   ```bash
   pip install --upgrade pip
   pip install -e .
   # Atau jika ingin install langsung dari requirements:
   # pip install -r requirements.txt   ← Pastikan file ini ada
   ```

4. **Konfigurasi Database**

   * Buka `production.ini` atau `testing.ini`, sesuaikan `sqlalchemy.url` dengan database Anda (misal: `postgresql://user:pass@localhost/dbname`).
   * Jika menggunakan SQLite untuk *quickstart*:

     ```ini
     sqlalchemy.url = sqlite:///./db.sqlite3
     ```

5. **Inisialisasi Migrasi (Opsional)**
   Jika Anda memakai Alembic untuk migrasi:

   ```bash
   alembic init alembic
   # Sesuaikan alembic.ini → sqlalchemy.url
   alembic revision --autogenerate -m "Initial migration"
   alembic upgrade head
   ```

---

### 🚀 Cara Menjalankan

* **Mode Development**

  ```bash
  pserve development.ini --reload
  ```

  > Aplikasi akan berjalan di `http://localhost:6543/` (default).
  > `--reload` akan memantau perubahan kode dan me-restart otomatis.

* **Mode Production**

  ```bash
  pserve production.ini
  ```

  Atau integrasikan dengan Gunicorn/uWSGI:

  ```bash
  gunicorn --paste production.ini
  ```

* **Cek API Endpoint**
  Setelah server berjalan, buka `http://localhost:6543/api/docs` (jika dokumentasi otomatis dipasang), atau langsung gunakan `curl` / Postman:

  ```bash
  curl http://localhost:6543/api/health
  ```

---

### 🧪 Testing

1. **Jalankan Semua Tes**

   ```bash
   pytest
   ```

2. **Coverage Report**

   ```bash
   pytest --cov=backend_app --cov-report=html
   ```

   Laporan HTML akan tersedia di folder `htmlcov/`.

3. **Contoh Tes**

   * **`tests/test_views.py`**: Memastikan endpoint mengembalikan status 200 untuk route tertentu.
   * **`tests/test_functional.py`**: Menggunakan `WebTest` untuk mensimulasikan request lengkap.

---

### 📝 Catatan Tambahan

* **Logging**:
  Atur level logging di `production.ini` (misal, `level = INFO` atau `DEBUG`).
* **Debug Toolbar**:
  Pastikan `pyramid_debugtoolbar` hanya aktif di development:

  ```ini
  [app:main]
  pyramid.includes = pyramid_debugtoolbar
  debugtoolbar.hosts = 127.0.0.1
  ```
* **Struktur yang Rapi**:
  Susun modul ke dalam folder `services/`, `utils/`, atau `models/` agar kode tetap terorganisir bila proyek membesar.
* **README.txt**:
  Sudah disertakan README lama; silakan baca sebagai referensi tambahan.

---

## Session 2: Frontend React Application

### 🔎 Deskripsi Singkat

Session ini adalah **aplikasi frontend** berbasis **React + Vite + TailwindCSS** dengan nama *“smbsuvannadipa-v1”*. Proyek ini mencakup fitur dasar:

* Halaman Login & Signup
* Dashboard 🎛️
* Daftar Siswa (CRUD) 📋
* Komponen chart menggunakan **Recharts**

---

### 💡 Teknologi dan Dependensi

* **Bahasa Pemrograman**: JavaScript (ESModule)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Framework UI**: [React 19.x](https://reactjs.org/)
* **Styling**: [TailwindCSS 4.x](https://tailwindcss.com/)
* **Charting**: [Recharts](https://recharts.org/)
* **Icon**: [Phosphor Icons](https://phosphoricons.com/)
* **HTTP Client**: [Axios](https://axios-http.com/)
* **Linting**: ESLint (`@eslint/js`, `eslint-plugin-react-hooks`)
* **State Management**: Custom Hooks (misal: `useSiswaAPI.jsx`)

---

### 📂 Struktur Folder

```
smbsuvannadipa-v1/
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── main.jsx                  ← Entry point utama React
│   ├── App.jsx                   ← Root component (opsional)
│   ├── hooks/
│   │   └── useSiswaAPI.jsx       ← Custom hook untuk memanggil API siswa
│   ├── pages/
│   │   ├── home/
│   │   │   └── home.jsx          ← Halaman Home
│   │   ├── login/
│   │   │   └── login.jsx         ← Halaman Login
│   │   ├── signup/
│   │   │   └── signup.jsx        ← Halaman Signup
│   │   ├── dashboard/
│   │   │   └── dashboard.jsx     ← Halaman Dashboard (simbol, grafik, dsb.)
│   │   └── daftarsiswa/
│   │       └── daftarsiswa.jsx    ← Halaman CRUD Daftar Siswa
│   │   └── pages.css             ← Styling global untuk folder pages (jika ada)
│   ├── components/               ← (Opsional: Komponen UI terpisah)
│   ├── assets/                   ← (Opsional: Gambar, logo, dsb.)
│   └── index.css                 ← Import Tailwind directives
└── node_modules/                 ← Dependensi (otomatis)
```

* **`index.html`**: Template HTML tunggal.
* **`src/main.jsx`**: Titik masuk (entry point) React → `ReactDOM.createRoot(...)`.
* **`tailwind.config.js`** & **`postcss.config.js`**: Konfigurasi TailwindCSS + PostCSS.
* **`vite.config.js`**: Pengaturan build Vite (alias, plugin Tailwind, React).
* **`src/hooks/`**: Kumpulan Custom Hooks (misal, `useSiswaAPI` untuk fetch data CRUD).
* **`src/pages/`**: Halaman–halaman utama aplikasi (dipisah berdasarkan fitur):

  * `home/`: Halaman Landing
  * `login/`: Form Login
  * `signup/`: Form Pendaftaran
  * `dashboard/`: Ringkasan data/grafik (memanfaatkan Recharts)
  * `daftarsiswa/`: CRUD Data Siswa (create, read, update, delete)
  * `pages.css`: Styling yang berlaku untuk seluruh halaman di folder pages.
* **`src/components/`**: (Bebas) Komponen–komponen tersusun kembali (button, input, card, dsb.).

---

### ⚙️ Instalasi & Konfigurasi

1. **Ekstrak ZIP**

   ```bash
   unzip smbsuvannadipa-v1.zip -d frontend_project
   cd frontend_project/smbsuvannadipa-v1
   ```

2. **Install Dependensi**

   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Konfigurasi Environment**

   * Bila perlu, buat file `.env` di root:

     ```
     VITE_API_BASE_URL=http://localhost:6543/api      # Sesuaikan dengan backend
     VITE_OTHER_ENV=...
     ```
   * Pastikan endpoint API sudah benar (misal, `/api/siswa`, `/api/auth/login`).

4. **TailwindCSS Setup**

   * Pastikan `./src/index.css` berisi:

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```
   * Cek `tailwind.config.js` sudah memuat:

     ```js
     module.exports = {
       content: ['./index.html', './src/**/*.{js,jsx}'],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```

---

### 🚀 Cara Menjalankan

* **Mode Development**

  ```bash
  npm run dev
  # atau
  yarn dev
  ```

  * Vite akan memulai server lokal di `http://localhost:3000/` (atau port lain yang tersedia).
  * Hot Module Replacement (HMR) otomatis, sehingga perubahan kode langsung terlihat.

* **Linting**

  ```bash
  npm run lint
  # atau
  yarn lint
  ```

  * Memeriksa kesalahan sintaksis, aturan React Hooks, dsb.

---

### 📦 Build & Deployment

* **Membangun untuk Produksi**

  ```bash
  npm run build
  # atau
  yarn build
  ```

  * Berkas statis akan dihasilkan di folder `dist/`.
  * Konten di `dist/` siap di-deploy ke layanan hosting (Netlify, Vercel, GitHub Pages, dsb.).

* **Preview Build**

  ```bash
  npm run preview
  # atau
  yarn preview
  ```

  * Menjalankan server lokal untuk melihat hasil build (`dist/`) sebelum mem-publish.

---

### 📝 Catatan Tambahan

* **Struktur Routing**:
  Komponen–komponen halaman terintegrasi melalui React Router (jika dipasang) atau routing berbasis kondisi di `App.jsx`.
* **Axios Interceptor**:
  Disarankan membuat interceptor di `src/hooks/useSiswaAPI.jsx` untuk menangani error umum (401 Unauthorized, dsb.).
* **Performance Tips**:

  * Lazy loading halaman dengan `React.lazy` + `Suspense`.
  * Tree-shaking otomatis oleh Vite.
* **UI/UX Enhancement**:

  * Gunakan ikon dari `@phosphor-icons/react`.
  * Sesuaikan theme Tailwind (`extend` di `tailwind.config.js`) agar tampilan lebih “fresh”.
* **Recharts**:

  * Contoh implementasi grafik di `src/pages/dashboard/dashboard.jsx`.
  * Data dummy bisa disesuaikan ulang untuk menampilkan statistik nyata.

---

## Session 3: Virtual Environment

### 🔎 Deskripsi Singkat

Session ini berisi **virtual environment** Python (`venv`) yang telah dikemas dalam `venv.zip`.
Tujuannya: memudahkan kita untuk langsung menjalankan backend aplikasi (`backend_app`) tanpa repot membuat `venv` baru dan install ulang paket.

> ⚠️ **Catatan Penting**:
> ‣ Virtual environment ini dibuat di sistem pengembang, jadi path-binary Python mungkin berbeda.
> ‣ Disarankan untuk **membuat venv baru** sendiri agar tidak terjadi konflik path (terutama di Windows vs Linux).
> ‣ Bila ingin tetap menggunakan `venv.zip`, aktifkan environment sesuai OS Anda.

---

### ⚙️ Cara Aktivasi & Penggunaan

1. **Ekstrak ZIP**

   ```bash
   unzip venv.zip -d my_venv
   cd my_venv/venv
   ```

2. **Aktifkan Virtual Environment**

   * **Linux / macOS**

     ```bash
     source bin/activate
     ```
   * **Windows (PowerShell)**

     ```powershell
     .\Scripts\Activate.ps1
     ```
   * **Windows (CMD)**

     ```cmd
     .\Scripts\activate.bat
     ```

3. **Cek Python & Pip**
   Setelah aktif, pastikan:

   ```bash
   python --version    # Harus menunjukkan versi yang sesuai (≥ 3.10)
   pip list            # Melihat daftar paket yang sudah terinstall
   ```

4. **Menjalankan Backend**

   * Pindah ke folder `backend_app/` (Session 1), lalu:

     ```bash
     pserve development.ini --reload
     ```
   * Pastikan modul `pyramid` dan paket lain sudah terdaftar di venv ini.

5. **Menambahkan atau Meng-update Paket**
   Bila ada paket baru yang perlu diinstal:

   ```bash
   pip install nama_paket
   pip freeze > requirements.txt   # (Opsional: perbarui daftar dependensi)
   ```

6. **Deactivate**
   Setelah selesai:

   ```bash
   deactivate
   ```

---

### 📦 Dependensi Utama

Virtual environment ini sudah berisi paket–paket yang dibutuhkan oleh `backend_app`:

* `pyramid`
* `pyramid_jinja2`
* `pyramid_debugtoolbar`
* `pytest`
* `psycopg2` (jika ada PostgreSQL)
* `alembic`
* ... dan dependensi lain sesuai `setup.py`.

> Jika Anda menemukan error missing package saat menjalankan backend, cukup:
>
> ```bash
> pip install nama_paket
> ```
>
> atau perbarui environment Anda sendiri.

---

### 📝 Catatan Tambahan

* Jika path di `venv/` tidak sesuai untuk OS Anda, **disarankan buat venv baru** di sistem Anda sendiri, lalu install `pip install -e .` di dalam folder `backend_app/`.
* Virtual environment ini berfungsi sebagai **starter kit** agar tidak perlu instalasi ulang paket–paket Python.
* Jangan commit folder `venv/` ke repositori, karena biasanya ukurannya besar dan sifatnya lingkungan lokal.

---

## 🎉 Penutup

Terima kasih telah menggunakan dokumentasi ini! Dengan ketiga sesi di atas, Anda sudah:

1. Mempunyai gambaran lengkap **backend** Pyramid
2. Memahami struktur dan cara menjalankan **frontend** React + Vite + TailwindCSS
3. Mengetahui cara **mengaktifkan virtual environment** Python

Semoga README.md ini membantu Anda memulai dan menikmati proses development.
Jika ada pertanyaan lebih lanjut atau butuh penjelasan detail, silakan hubungi tim pengembang atau buka isu (“Issue”) di repositori. Selamat berkoding! 🚀✨

---
