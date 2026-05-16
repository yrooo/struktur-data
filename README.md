# Struktur Data - Linked List Playlist

Proyek ini adalah demo Next.js yang memvisualisasikan konsep doubly linked list lewat antarmuka pemutar musik bergaya Spotify. Setiap lagu direpresentasikan sebagai node, lalu pengguna bisa menambahkan lagu ke antrean, berpindah ke lagu berikutnya atau sebelumnya, memilih node tertentu, dan melihat struktur list secara visual.

## Ringkasan

- Frontend dibuat dengan Next.js App Router, React 19, TypeScript, dan Tailwind CSS 4.
- Logika antrean lagu disimpan di implementasi doubly linked list pada folder `lib`.
- State pemutaran dikelola oleh custom hook `usePlaylist`.
- UI utama terdiri dari pemutar audio, daftar antrean, daftar lagu yang tersedia, dan visualizer node.
- Aset lagu dan cover disimpan di folder `public`.

## Fitur Utama

- Pemutaran lagu dengan tombol play, pause, next, dan previous.
- Seek bar untuk memindahkan posisi audio.
- Queue lagu yang bisa dipilih per item.
- Daftar lagu tersedia untuk ditambahkan ke antrean.
- Visualisasi head, current, dan tail pada doubly linked list.
- Tampilan fullscreen dengan latar dinamis berdasarkan cover lagu aktif.

## Stack Teknologi

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react untuk ikon

## Cara Menjalankan

1. Instal dependensi.

```bash
npm install
```

2. Jalankan development server.

```bash
npm run dev
```

3. Buka aplikasi di browser.

```text
http://localhost:3000
```

## Skrip Tersedia

| Perintah | Keterangan |
| --- | --- |
| `bun run dev` | Menjalankan server development Next.js |
| `bun run build` | Membangun aplikasi untuk production |
| `bun run start` | Menjalankan hasil build production |
| `bun run lint` | Menjalankan ESLint |

## Struktur Proyek

```text
app/
  layout.tsx           Root layout, metadata, dan font global
  globals.css          Style global dan styling slider
  page.tsx              Halaman utama aplikasi
components/
  SpotifyPlayer.tsx     UI pemutar, queue, dan daftar lagu tersedia
  LinkedListVisualizer.tsx
                        Visualisasi node dan pointer linked list
hooks/
  usePlaylist.ts        State management playlist dan kontrol audio
lib/
  DoublyLinkedList.ts   Implementasi struktur data doubly linked list
public/
  *.png, *.mp3          Cover artwork dan file audio demo
```

## Cara Kerja Aplikasi

### 1. Data Lagu

Tipe data lagu didefinisikan sebagai `Song` di `lib/DoublyLinkedList.ts`.

Setiap lagu memiliki:

- `id`
- `title`
- `artist`
- `album`
- `coverImage`
- `audioFile`

### 2. Struktur Data

`DoublyLinkedList` menyimpan node dengan referensi ke node sebelumnya dan sesudahnya. Implementasi ini menyediakan operasi berikut:

- `append` untuk menambah lagu ke akhir list
- `goNext` untuk berpindah ke node berikutnya
- `goPrev` untuk berpindah ke node sebelumnya
- `setCurrentByIndex` untuk memilih node berdasarkan indeks
- `getNodes` untuk membaca seluruh node
- `getCurrentIndex` untuk mengambil posisi aktif

### 3. State Playlist

Hook `usePlaylist` menghubungkan doubly linked list dengan elemen audio HTML.

Hook ini bertanggung jawab untuk:

- membuat list dari array lagu
- menyimpan lagu aktif dan indeks aktif
- mengelola status play/pause
- membaca durasi dan posisi audio saat ini
- mengatur event `timeupdate`, `loadedmetadata`, dan `ended`
- menambahkan lagu baru ke antrean

### 4. UI Utama

- `app/page.tsx` menyusun halaman utama.
- `components/SpotifyPlayer.tsx` menampilkan panel pemutar, queue, dan daftar lagu tersedia.
- `components/LinkedListVisualizer.tsx` menampilkan node list secara horizontal.

## Aset Demo

Folder `public` berisi aset yang dipakai di aplikasi.

- Cover gambar: `wagwan-album.png`, `booga.png`, `heartless.png`, `passionfruit.png`, `one-dance.png`
- Audio: `wagwan.mp3`, `passionfruit.mp3`, `one-dance.mp3`

Beberapa template lagu pada halaman utama memakai audio yang sama karena proyek ini diposisikan sebagai demo visualisasi struktur data, bukan katalog musik lengkap.

## Metadata Halaman

Root layout menetapkan judul dan deskripsi aplikasi sebagai berikut:

- Title: Linked List Playlist
- Description: Spotify-style playlist UI powered by a doubly linked list.

Font global memakai Geist Sans dan Geist Mono melalui `next/font`.

## Catatan Implementasi

- Proyek ini menggunakan komponen client-side untuk mengelola audio dan state interaktif.
- Background halaman berubah mengikuti cover lagu yang sedang aktif.
- Slider progress memiliki styling kustom di `app/globals.css`.
- Queue dan visualizer membaca sumber data yang sama agar status UI tetap sinkron.

## Pengembangan Lanjutan

Ide pengembangan berikutnya jika proyek ini ingin diperluas:

- menambah operasi insert dan delete pada doubly linked list
- menampilkan pointer prev dan next secara lebih eksplisit di visualizer
- menambah metadata durasi, genre, atau tahun rilis pada tiap lagu
- menyimpan queue di local storage agar tidak hilang saat reload
- menambahkan test untuk hook dan struktur data

## Troubleshooting

### Audio tidak berjalan

- Pastikan file audio ada di folder `public`.
- Coba tekan tombol play secara manual karena browser bisa memblokir autoplay.

### Cover tidak muncul

- Periksa nama file pada objek `Song`.
- Pastikan gambar tersedia di folder `public`.

### Build gagal

- Jalankan ulang instalasi dependensi.
- Pastikan versi Node.js atau runtime yang dipakai kompatibel dengan Next.js 16.

## Referensi File Penting

- [Halaman utama](app/page.tsx)
- [Root layout](app/layout.tsx)
- [Style global](app/globals.css)
- [Pemutar dan queue](components/SpotifyPlayer.tsx)
- [Visualizer linked list](components/LinkedListVisualizer.tsx)
- [Hook playlist](hooks/usePlaylist.ts)
- [Implementasi struktur data](lib/DoublyLinkedList.ts)

## URL Demo Website

https://struktur-data-eight.vercel.app/