import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Multi-Page App: tiap file HTML jadi entry point terpisah,
// tapi tetap pakai React buat render kontennya.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        produk: resolve(__dirname, 'produk.html'),
        pesan: resolve(__dirname, 'pesan.html'),
        riwayat: resolve(__dirname, 'riwayat.html'),
        tentang: resolve(__dirname, 'tentang.html'),
      },
    },
  },
})
