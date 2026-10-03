import { useEffect, useState } from 'react'
import { getData, saveData, formatTanggal } from '../utils/storage'

function Riwayat() {
  const [data, setData] = useState([])

  useEffect(() => {
    setData(getData())
  }, [])

  function handleHapusSemua() {
    if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pesanan?')) {
      saveData([])
      setData([])
    }
  }

  function handleEdit(id) {
    window.location.href = `pesan.html?edit=${id}`
  }

  function handleHapus(id) {
    if (confirm('Hapus pesanan ini selamanya?')) {
      const updated = data.filter((item) => item.id !== id)
      saveData(updated)
      setData(updated)
    }
  }

  const isEmpty = data.length === 0

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>📋 Riwayat Pesanan</h1>
          <p>Daftar semua pesanan pupuk yang telah Anda ajukan</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="riwayat-toolbar">
            <div className="riwayat-info">
              <h2>📦 Data Pesanan</h2>
              <p className="section-desc">Total: <strong>{data.length} pesanan</strong></p>
            </div>
            {!isEmpty && (
              <button className="btn btn-danger btn-sm" onClick={handleHapusSemua}>
                🗑️ Hapus Semua
              </button>
            )}
          </div>

          {isEmpty ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>Belum Ada Pesanan</h3>
              <p>Anda belum memiliki riwayat pesanan. Mulai pesan produk pupuk sekarang!</p>
              <a href="pesan.html" className="btn btn-green" style={{ marginTop: '16px' }}>
                🌱 Pesan Sekarang
              </a>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <caption>Data Pesanan Pupuk Mother Nature</caption>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Pemesan</th>
                    <th>Produk</th>
                    <th>Jumlah (kg)</th>
                    <th>Pengiriman</th>
                    <th>Pembayaran</th>
                    <th>Tanggal Pesan</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item.id}>
                      <td>{i + 1}</td>
                      <td>
                        {item.nama}
                        <br />
                        <span style={{ fontSize: '0.75rem', color: '#5a7a45' }}>{item.telepon}</span>
                      </td>
                      <td>{item.produk}</td>
                      <td style={{ textAlign: 'center' }}>{item.jumlah} kg</td>
                      <td>{item.pengiriman}</td>
                      <td>{item.pembayaran}</td>
                      <td>{formatTanggal(item.tanggal)}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEdit(item.id)}>✏️ Edit</button>{' '}
                        <button className="btn-hapus" onClick={() => handleHapus(item.id)}>🗑️ Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Riwayat
