import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind-output.css'
import './style.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Riwayat from './components/Riwayat'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar current="Riwayat" />
    <Riwayat />
    <Footer />
  </StrictMode>,
)
