import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import Publicacion from './views/Publicacion'
import Home from './views/Home'
import MostrarPublicacion from './views/MostrarPublicacion'
import EditarPublicacion from './views/EditarPublicacion'
import Footer from './components/Footer'

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Publicar" element={<Publicacion />} />
        <Route path="/MostrarPublicacion/:id" element={<MostrarPublicacion />} />
        <Route path="/EditarPublicacion/:id" element={<EditarPublicacion />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
