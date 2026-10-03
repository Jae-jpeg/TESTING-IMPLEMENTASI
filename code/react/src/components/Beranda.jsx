import { produkList } from '../data/produk'

function Beranda() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <span className="hero-badge">🌱 Distributor Pupuk Terpercaya</span>
          <h1>
            Solusi Lengkap <span>Pertanian</span> Modern
          </h1>
          <p>
            Mother Nature menghadirkan produk pupuk berkualitas untuk petani Indonesia yang
            produktif dan berkelanjutan.
          </p>
          <div className="hero-buttons">
            <a href="produk.html" className="btn btn-primary">🌾 Lihat Katalog</a>
            <a href="pesan.html" className="btn btn-outline">📋 Pesan Sekarang</a>
            <a href="tentang.html" className="btn btn-outline">ℹ️ Tentang kami</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🌱 Daftar Produk Pupuk</h2>
            <p className="section-desc">Semua produk tersedia dalam satuan kilogram (kg)</p>
          </div>
          <div className="produk-grid">
            {produkList.map((produk) => (
              <article className="produk-card" key={produk.id}>
                <h3>{produk.nama}</h3>
                <img src={produk.gambar} width="300" height="200" alt={produk.nama} />
              </article>
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '28px' }}>
          <a href="produk.html" className="btn btn-green">Lihat Produk Lebih Detail →</a>
        </p>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Cara Pemesanan</h2>
            <p className="section-desc">Mudah dan cepat hanya dalam 4 langkah</p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Pilih Produk</h3>
              <p>Browse produk dan pilih pupuk sesuai kebutuhan lahan Anda</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Isi Form Pesanan</h3>
              <p>Lengkapi data pengiriman dan jumlah pesanan melalui form online</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Pembayaran</h3>
              <p>Bayar secara Tunai / Non-tunai</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Terima Pesanan</h3>
              <p>Produk dikirim langsung ke lokasi Anda dengan aman</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-green">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-box transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
              <span className="stat-number">15+</span>
              <span className="stat-label">Tahun Pengalaman</span>
            </div>
            <div className="stat-box transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
              <span className="stat-number">6</span>
              <span className="stat-label">Jenis Pupuk</span>
            </div>
            <div className="stat-box transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
              <span className="stat-number">12.000+</span>
              <span className="stat-label">Petani Aktif</span>
            </div>
            <div className="stat-box transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
              <span className="stat-number">34</span>
              <span className="stat-label">Provinsi</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Beranda
