import { produkList } from '../data/produk'

function Produk() {
  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>🌾Produk Pupuk</h1>
          <p>6 produk pupuk pilihan untuk kebutuhan lahan Anda</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>🌱 Daftar Produk secara detail</h2>
            <p className="section-desc">Semua produk tersedia dalam satuan kilogram (kg)</p>
          </div>
          <div className="produk-grid">
            {produkList.map((produk) => (
              <article className="produk-card" key={produk.id}>
                <img src={produk.gambar} alt={produk.nama} />
                <h3>{produk.nama}</h3>
                <p>{produk.deskripsi}</p>
                <span className="inline-block bg-emerald-100 text-emerald-700 text-[0.7rem] font-semibold px-3 py-1 rounded-full">
                  Stok: {produk.stok}
                </span>
                <div className="card-price-row">
                  <span className="card-price">{produk.harga}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '28px' }}>
          <a href="pesan.html" className="btn btn-green">Pesan Produk Anda →</a>
        </p>
      </section>
    </main>
  )
}

export default Produk
