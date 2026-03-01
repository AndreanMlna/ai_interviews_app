# 🤖 AI Mock Interview Platform

Platform persiapan wawancara kerja berbasis AI yang membantu pengguna berlatih interview secara real-time. Sistem akan memberikan feedback instan, skor penilaian, serta analisis mendalam mengenai kekuatan dan area yang perlu ditingkatkan.



## 🌟 Fitur Utama

* **Custom Interview:** Pilih peran (Role), teknologi (Tech Stack), dan tipe interview (Behavioral/Technical/Mixed).
* **AI-Powered Feedback:** Penilaian otomatis menggunakan Google Gemini AI berdasarkan jawaban pengguna.
* **Score Breakdown:** Analisis skor per kategori (Komunikasi, Pengetahuan Teknis, dll).
* **Interview History:** Simpan dan tinjau kembali hasil interview sebelumnya.
* **Tech Stack Icons:** Visualisasi teknologi yang digunakan dalam sesi interview.

## 🛠️ Tech Stack

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Database:** Firebase Firestore
* **AI Engine:** Google Gemini SDK / Vercel AI SDK
* **Styling:** Tailwind CSS & Shadcn UI
* **Date Handling:** Day.js



## 🚀 Memulai

### Prasyarat
* Node.js 18.x atau terbaru
* Akun Firebase
* API Key Google Gemini

### Instalasi

1. **Clone repositori:**
   ```bash
   git clone [https://github.com/username/jsm_mock_interview_platform.git](https://github.com/username/jsm_mock_interview_platform.git)
   cd jsm_mock_interview_platform
Install dependensi:

Bash
npm install
# Jika ingin menggunakan pnpm yang baru saja diaktifkan:
# pnpm install
Setup Environment Variables:
Buat file .env.local di root folder dan masukkan kredensial berikut:

Cuplikan kode
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
GEMINI_API_KEY=your_gemini_key
Jalankan server pengembangan:

Bash
npm run dev
📂 Struktur Folder Utama
app/ - Route, Page, dan Layout Next.js.

components/ - Komponen UI (Button, Card, Input).

lib/ - Konfigurasi Firebase, Utility, dan Server Actions.

public/ - Aset statis (SVG, Images).

📝 Catatan Penting
Proyek ini dikonfigurasi menggunakan NPM sebagai package manager utama. Jika ingin beralih ke PNPM, pastikan untuk menghapus package-lock.json dan menjalankan pnpm install untuk konsistensi file lock.

Dibuat dengan ❤️ untuk persiapan karir yang lebih baik.


---

### Tips untuk Kamu:
1.  **Ganti Link Github:** Ubah bagian `git clone` dengan link repo aslimu.
2.  **Tambahkan Screenshot:** Jika aplikasimu sudah jadi, ambil screenshot dashboard-nya, simpan di folder `public`, lalu ganti teks `` dengan tag gambar Markdown: `![Dashboard](/dashboard-screenshot.png)`.
3.  **Hapus baris `packageManager`:** Jangan lupa lakukan hal yang kita bahas tadi (hapus di `package.json`) jika kamu memutuskan untuk tetap menggunakan `npm` untuk proyek ini.

Ada bagian fitur lain yang ingin kamu tambahkan ke dalam README ini? Mungkin fitur rekam suara atau video jika ada?
