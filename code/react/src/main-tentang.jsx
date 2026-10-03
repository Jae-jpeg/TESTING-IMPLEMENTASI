import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind-output.css'
import './style.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Tentang from './components/Tentang'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar current="Tentang" />
    <Tentang />
    <Footer />
  </StrictMode>,
)
