import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Publicacion from './views/Publicacion'
import Home from './views/Home'
import MostrarPublicacion from './views/MostrarPublicacion'
import EditarPublicacion from './views/EditarPublicacion'
import Registrarse from './views/Registrarse'
import GlobalState from './context/GlobalContext' /*Provider context Api*/

function App() {

  return (
    <GlobalState>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Publicar" element={<Publicacion />} />
          <Route path="/MostrarPublicacion/:id" element={<MostrarPublicacion />} />
          <Route path="/EditarPublicacion/:id" element={<EditarPublicacion />} />
          <Route path="/Registrarse" element={<Registrarse />} />
        </Routes>
      </BrowserRouter>
    </GlobalState>
  )
}

export default App
