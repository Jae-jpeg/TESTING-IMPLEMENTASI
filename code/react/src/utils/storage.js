const STORAGE_KEY = 'mothernature_pesanan'

export function getData() {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function formatTanggal(dateStr) {
  const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const d = new Date(dateStr)
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear()
}
