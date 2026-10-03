import { useEffect, useRef, useState } from 'react'
import { getData, saveData } from '../utils/storage'

const provinsiOptions = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau', 'Jambi',
  'Sumatera Selatan', 'Kepulauan Bangka Belitung', 'Bengkulu', 'Lampung', 'DKI Jakarta',
  'Jawa Barat', 'Banten', 'Jawa Tengah', 'DI Yogyakarta', 'Jawa Timur', 'Bali',
  'Nusa Tenggara Barat', 'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah',
  'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara', 'Sulawesi Utara', 'Gorontalo',
  'Sulawesi Tengah', 'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tenggara', 'Maluku',
  'Maluku Utara', 'Papua', 'Papua Barat', 'Papua Tengah', 'Papua Pegunungan', 'Papua Selatan',
  'Papua Barat Daya',
]

const produkOptions = [
  'Pupuk Natur T16 — Rp 85.000/kg',
  'Pupuk Natur Urea — Rp 120.000/kg',
  'Pupuk Naturstar 16-20s — Rp 45.000/kg',
  'Pupuk Naturfast Powder — Rp 90.000/kg',
  'Pupuk N-Multi CRF+ — Rp 110.000/kg',
  'Pupuk Natur Zinc — Rp 110.000/kg',
]

const formKosong = {
  nama: '', telepon: '', email: '', alamat: '', kota: '', provinsi: 'pilihan',
  produk: 'pilihan', jumlah: '', pengiriman: 'pilihan', pembayaran: 'pilihan', catatan: '',
}

function FormPesanan() {
  // Ambil ?edit=id dari URL secara manual (nggak pakai react-router-dom)
  const editId = new URLSearchParams(window.location.search).get('edit')
  const editMode = Boolean(editId)

  const [form, setForm] = useState(formKosong)
  const [error, setError] = useState('')
  const formWrapperRef = useRef(null)

  useEffect(() => {
    if (editId) {
      const data = getData()
      const item = data.find((d) => d.id == editId)
      if (item) {
        setForm({
          nama: item.nama || '', telepon: item.telepon || '', email: item.email || '',
          alamat: item.alamat || '', kota: item.kota || '', provinsi: item.provinsi || 'pilihan',
          produk: item.produk || 'pilihan', jumlah: item.jumlah || '',
          pengiriman: item.pengiriman || 'pilihan', pembayaran: item.pembayaran || 'pilihan',
          catatan: item.catatan || '',
        })
        setTimeout(() => {
          formWrapperRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [editId])

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'telepon') {
      setForm((f) => ({ ...f, telepon: value.replace(/[^0-9]/g, '').slice(0, 13) }))
      return
    }
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { nama, telepon, email, alamat, kota, provinsi, produk, jumlah, pengiriman, pembayaran, catatan } = form

    if (
      !nama.trim() || !telepon.trim() || !email.trim() || !alamat.trim() || !kota.trim() ||
      !provinsi || provinsi === 'pilihan' ||
      !produk || produk === 'pilihan' ||
      !jumlah ||
      !pengiriman || pengiriman === 'pilihan' ||
      !pembayaran || pembayaran === 'pilihan'
    ) {
      setError('❌ Semua isian wajib harus dilengkapi!')
      return
    }

    if (!/^[0-9]+$/.test(telepon) || telepon.length > 13) {
      setError('❌ Nomor telepon hanya boleh angka, maksimal 13 digit!')
      return
    }

    if (isNaN(jumlah) || Number(jumlah) < 1) {
      setError('❌ Jumlah pesanan minimal 1 kg!')
      return
    }

    const data = getData()

    if (editMode) {
      const idx = data.findIndex((d) => d.id == editId)
      if (idx !== -1) {
        data[idx] = {
          ...data[idx],
          nama: nama.trim(), telepon: telepon.trim(), email: email.trim(),
          alamat: alamat.trim(), kota: kota.trim(), provinsi, produk, jumlah,
          pengiriman, pembayaran, catatan: catatan.trim(),
        }
      }
    } else {
      data.push({
        id: Date.now(),
        nama: nama.trim(), telepon: telepon.trim(), email: email.trim(),
        alamat: alamat.trim(), kota: kota.trim(), provinsi, produk, jumlah,
        pengiriman, pembayaran, catatan: catatan.trim(),
        tanggal: new Date().toISOString().split('T')[0],
      })
    }

    saveData(data)
    alert(editMode ? '✅ Perubahan berhasil disimpan!' : '✅ Pesanan berhasil dikirim!')
    window.location.href = 'riwayat.html'
  }

  return (
    <main>
      <div className="page-header">
        <div className="container">
          <h1>📋 Form Pemesanan</h1>
          <p>Isi data di bawah ini untuk memesan produk pupuk Mother Nature</p>
        </div>
      </div>

      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>ℹ️ Informasi Pembelian</h2>
            <p className="section-desc">Ketentuan pembelian produk Mother Nature</p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">📦</div>
              <h3>Satuan Berat</h3>
              <p>Semua produk dijual dalam satuan kilogram (kg). Minimum pembelian 1 kg per produk.</p>
            </div>
            <div className="step">
              <div className="step-number">🚚</div>
              <h3>Pengiriman</h3>
              <p>Pengiriman ke seluruh Indonesia. Ongkos kirim dihitung berdasarkan berat dan jarak.</p>
            </div>
            <div className="step">
              <div className="step-number">✅</div>
              <h3>Kualitas</h3>
              <p>Semua produk bersertifikat Kementerian Pertanian RI dan telah teruji kualitasnya.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="form-wrapper" id="formWrapper" ref={formWrapperRef}>
            <h2 style={{ color: '#2d4a22', marginBottom: '6px' }}>Data Pemesanan</h2>
            <p className="section-desc" style={{ marginBottom: '24px' }}>Lengkapi semua data dengan benar</p>

            <p className="form-error">{error}</p>

            <form onSubmit={handleSubmit}>
              <h3 style={{ color: '#3a7d1e', marginBottom: '14px', paddingBottom: '8px', borderBottom: '1px solid #e0edd5' }}>
                👤 Data Pemesan
              </h3>

              <div className="form-group">
                <label htmlFor="nama">Nama Lengkap</label>
                <input type="text" id="nama" name="nama" placeholder="Masukkan nama lengkap" value={form.nama} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telepon">Nomor Telepon</label>
                  <input type="tel" id="telepon" name="telepon" placeholder="Contoh: 08123456789" inputMode="numeric" pattern="[0-9]*" maxLength="13" value={form.telepon} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Contoh: nama@email.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="alamat">Alamat Pengiriman</label>
                <textarea id="alamat" name="alamat" rows="2" placeholder="Masukkan alamat lengkap pengiriman" value={form.alamat} onChange={handleChange} required></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="kota">Kota / Kabupaten</label>
                  <input type="text" id="kota" name="kota" placeholder="Contoh: Medan" value={form.kota} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="provinsi">Provinsi</label>
                  <select id="provinsi" name="provinsi" value={form.provinsi} onChange={handleChange} required>
                    <option value="pilihan">-- Pilih Provinsi --</option>
                    {provinsiOptions.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <h3 style={{ color: '#3a7d1e', margin: '24px 0 14px', paddingBottom: '8px', borderBottom: '1px solid #e0edd5' }}>
                🌱 Data Produk
              </h3>

              <div className="form-group">
                <label htmlFor="produk">Pilih Produk</label>
                <select id="produk" name="produk" value={form.produk} onChange={handleChange} required>
                  <option value="pilihan">-- Pilih Pupuk Yang Anda Butuhkan --</option>
                  {produkOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jumlah">Jumlah Pesanan (kg)</label>
                  <input type="number" id="jumlah" name="jumlah" min="1" placeholder="Contoh: 10" value={form.jumlah} onChange={handleChange} required />
                  <p className="form-note">* Minimum pembelian 1 kg</p>
                </div>
                <div className="form-group">
                  <label htmlFor="pengiriman">Metode Pengiriman</label>
                  <select id="pengiriman" name="pengiriman" value={form.pengiriman} onChange={handleChange} required>
                    <option value="pilihan">-- Pilih Ekspedisi --</option>
                    <option value="Reguler (3-5 hari)">Reguler (3-5 hari)</option>
                    <option value="Ekspres (1-2 hari)">Ekspres (1-2 hari)</option>
                    <option value="Ambil di Gudang">Ambil di Gudang</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pembayaran">Metode Pembayaran</label>
                <select id="pembayaran" name="pembayaran" value={form.pembayaran} onChange={handleChange} required>
                  <option value="pilihan">-- Pilih Metode Pembayaran --</option>
                  <option value="Tunai">Tunai</option>
                  <option value="Non-Tunai">Non-Tunai</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="catatan">Catatan Pesanan (Opsional)</label>
                <textarea id="catatan" name="catatan" rows="3" placeholder="Tuliskan catatan tambahan jika ada..." value={form.catatan} onChange={handleChange}></textarea>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-green" style={{ flex: 1 }}>
                  {editMode ? '✏️ Simpan Perubahan' : '📤 Kirim Pesanan'}
                </button>
                <button type="button" className="btn btn-outline-green" onClick={() => setForm(formKosong)}>
                  ↺ Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FormPesanan
