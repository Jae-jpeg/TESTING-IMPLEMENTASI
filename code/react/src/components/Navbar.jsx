import { useState } from 'react'
import logo from '../assets/logo.png'

// current: nama halaman aktif, dioper dari tiap entry file (main-*.jsx)
function Navbar({ current }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const menu = [
    { key: 'Beranda', href: 'index.html', label: 'Beranda' },
    { key: 'Produk', href: 'produk.html', label: 'Produk' },
    { key: 'Pesan', href: 'pesan.html', label: 'Pemesanan' },
    { key: 'Riwayat', href: 'riwayat.html', label: 'Riwayat' },
    { key: 'Tentang', href: 'tentang.html', label: 'Tentang Kami' },
  ]

  return (
    <header className="navbar" id="navbar">
      <div className="container navbar-inner">
        <a href="index.html" className="logo">
          <div className="logo-leaf">
            <img src={logo} alt="Mother Nature" />
          </div>
          Mother Nature
        </a>

        <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav>
          <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
            {menu.map((item) => (
              <li key={item.key}>
                <a href={item.href} className={current === item.key ? 'active' : ''}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
