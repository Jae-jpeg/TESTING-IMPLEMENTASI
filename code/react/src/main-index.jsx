import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind-output.css'
import './style.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Beranda from './components/Beranda'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar current="Beranda" />
    <Beranda />
    <Footer />
  </StrictMode>,
)
