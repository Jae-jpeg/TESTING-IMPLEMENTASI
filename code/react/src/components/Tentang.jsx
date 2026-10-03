function Tentang() {
  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>🌿 Tentang Mother Nature</h1>
          <p>Distributor pupuk terpercaya untuk petani Indonesia</p>
        </div>
      </div>

      {/* Sekilas Perusahaan */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Sekilas Perusahaan</h2>
              <p>
                Mother Nature didirikan sebagai perusahaan yang bergerak di bidang distribusi
                produk pupuk dan agrikultur. Berangkat dari misi untuk meningkatkan produktivitas
                petani Indonesia, Mother Nature hadir dengan menghadirkan produk-produk
                berkualitas tinggi yang terjangkau.
              </p>
              <p>
                Dengan pengalaman lebih dari 15 tahun, Mother Nature kini telah melayani lebih
                dari 12.000 petani aktif di 34 provinsi di Indonesia, menjadi mitra terpercaya
                dalam sektor pertanian nasional.
              </p>
              <p>
                Produk-produk Mother Nature telah mendapatkan sertifikasi dari Kementerian
                Pertanian Republik Indonesia dan memenuhi standar mutu internasional.
              </p>

              <h3 style={{ marginTop: '20px', marginBottom: '12px', color: '#2d4a22' }}>
                Nilai Perusahaan
              </h3>
              <ul className="value-list">
                <li><span className="value-icon">✅</span> Kualitas produk yang terverifikasi dan bersertifikat resmi</li>
                <li><span className="value-icon">✅</span> Harga yang kompetitif dan transparan tanpa biaya tersembunyi</li>
                <li><span className="value-icon">✅</span> Dukungan teknis oleh agronomis berpengalaman di lapangan</li>
                <li><span className="value-icon">✅</span> Pengiriman cepat ke seluruh wilayah Indonesia</li>
                <li><span className="value-icon">✅</span> Komitmen terhadap pertanian berkelanjutan dan ramah lingkungan</li>
              </ul>
            </div>
            <div className="about-visual">
              <div className="about-visual-icon">🌿</div>
              <h3>"Good For Your Plants"</h3>
              <p>Mengawal Petani Indonesia menuju pertanian modern yang produktif dan berkelanjutan.</p>
              <br />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginTop: '8px',
                  textAlign: 'center',
                }}
              >
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a8d878', margin: 0 }}>15+</p>
                  <p style={{ fontSize: '0.73rem', color: '#c8e6b0', margin: 0 }}>Tahun Berdiri</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a8d878', margin: 0 }}>6</p>
                  <p style={{ fontSize: '0.73rem', color: '#c8e6b0', margin: 0 }}>Jenis Pupuk</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a8d878', margin: 0 }}>12.000+</p>
                  <p style={{ fontSize: '0.73rem', color: '#c8e6b0', margin: 0 }}>Petani Aktif</p>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a8d878', margin: 0 }}>34</p>
                  <p style={{ fontSize: '0.73rem', color: '#c8e6b0', margin: 0 }}>Provinsi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Hubungi Kami</h2>
            <p className="section-desc">Tim kami siap membantu kebutuhan pertanian Anda</p>
          </div>
          <div className="kontak-grid">
            <div className="kontak-card">
              <div className="kontak-icon">🏢</div>
              <h3>Kantor Pusat</h3>
              <p>Jl. Agrikultura No. 88, Medan, Sumatera Utara 20211</p>
            </div>
            <div className="kontak-card">
              <div className="kontak-icon">📞</div>
              <h3>Telepon & WhatsApp</h3>
              <p>+62 12-3456-7890</p>
            </div>
            <div className="kontak-card">
              <div className="kontak-icon">✉️</div>
              <h3>Email</h3>
              <p>info@mothernature.id</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Tentang
