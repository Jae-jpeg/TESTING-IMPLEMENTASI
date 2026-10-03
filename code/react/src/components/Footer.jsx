function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="index.html" className="logo">
            <div className="logo-leaf">Mother Nature</div>
          </a>
          <p>Platform digital untuk kebutuhan pupuk dan agrikultur Indonesia. Terpercaya sejak 2010.</p>
        </div>
        <div className="footer-nav">
          <h4>Navigasi</h4>
          <ul>
            <li><a href="index.html">Beranda</a></li>
            <li><a href="produk.html">Produk</a></li>
            <li><a href="pesan.html">Pemesanan</a></li>
            <li><a href="riwayat.html">Riwayat</a></li>
            <li><a href="tentang.html">Tentang Kami</a></li>
          </ul>
        </div>
        <div className="footer-nav">
          <h4>Kontak</h4>
          <p>📞 +62 812-3456-7890</p>
          <p>✉️ info@mothernature.id</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Mother Nature — Dibuat untuk Tugas Proyek Perancangan Web</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
