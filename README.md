# 🤖 AI Mock Interview Platform

Platform persiapan wawancara kerja berbasis AI yang membantu pengguna berlatih interview secara real-time. Sistem akan memberikan feedback instan, skor penilaian, serta analisis mendalam mengenai kekuatan dan area yang perlu ditingkatkan.

## 🌟 Fitur Utama

* **Custom Interview:** Pilih peran (Role), teknologi (Tech Stack), dan tipe interview (Behavioral/Technical/Mixed).
* **AI-Powered Feedback:** Penilaian otomatis menggunakan Google Gemini AI berdasarkan jawaban pengguna.
* **Voice Interactive Interview:** Wawancara interaktif menggunakan AI Voice Assistant.
* **Score Breakdown:** Analisis skor per kategori (Komunikasi, Pengetahuan Teknis, dll).
* **Interview History:** Simpan dan tinjau kembali hasil interview sebelumnya.
* **Tech Stack Icons:** Visualisasi teknologi yang digunakan dalam sesi interview.

## 🛠️ Tech Stack

* **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Database:** Firebase Firestore
* **AI Engine:** Google Gemini SDK / Vercel AI SDK
* **Voice AI:** Vapi.ai (atau Voice Assistant API lainnya)
* **Styling:** Tailwind CSS & Shadcn UI
* **Date Handling:** Day.js

## 🚀 Memulai

### Prasyarat
* Node.js 18.x atau terbaru
* Akun Firebase
* API Key Google Gemini
* API Key Voice AI Assistant

### Instalasi

1. **Clone repositori:**
   ```bash
   git clone [https://github.com/username/jsm_mock_interview_platform.git](https://github.com/AndreanMlna/jsm_mock_interview_platform.git)
   cd jsm_mock_interview_platform
Install dependensi:

Bash
npm install
Setup Environment Variables:
Buat file .env.local di root folder dan masukkan kredensial berikut:

Cuplikan kode
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id

# Gemini Config
GEMINI_API_KEY=your_gemini_key

# Voice AI Assistant Config (Tambahkan sesuai yang kamu pakai)
NEXT_PUBLIC_ASSISTANT_ID=your_assistant_id
Jalankan server pengembangan:

Bash
npm run dev
📂 Struktur Folder Utama
app/ - Route, Page, dan Layout Next.js.

components/ - Komponen UI (Button, Card, Input).

lib/ - Konfigurasi Firebase, Utility, dan Server Actions.

public/ - Aset statis (SVG, Images).
