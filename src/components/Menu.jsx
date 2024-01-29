import React, { useState, useContext } from "react";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import Login from './Login';
import AppContext from "../context/appContext";


const Menu = () => {
    const context = useContext(AppContext);
    const [estadoMostrarLogin, setEstadoMostrarLogin] = useState(false)

    const navegar = useNavigate();

    const handleLogin = () => {
        setEstadoMostrarLogin(true)
    }


    const handleLogout = () => {
        localStorage.removeItem('usuario')
        localStorage.removeItem('nombre')
        localStorage.removeItem('token')
        context.setUsuarioLogin("")
        context.setNombreLogin("")
        navegar("/home");
    }

    return (
        <AppContext.Consumer>
            {context =>
                <>
                    <header className="text-center" name="home">

                        <div className="intro-text">
                            <h1 className="wow fadeInDown">Bienvenido <strong><span className="color"> a mis Viajes</span></strong></h1>
                            <p className="wow fadeInDown">Porfolio de Viajes</p>
                            <div className="search-container">
                                <Search />
                            </div>
                        </div>
                    </header>

                    <div className="header">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <i className="fas fa-home"> </i> <Link className="navbar-brand" to="/home">Home</Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarScroll">
                                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll navmenu">
                                        {context.usuarioLogin && <li className="nav-item">
                                            <Link className="nav-link" to="/Publicar">Publicar</Link>
                                        </li>}
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Usuario
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                                {!context.usuarioLogin && <li><a className="dropdown-item" href='#' onClick={handleLogin}>Login</a></li>}
                                                {context.usuarioLogin && <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>}
                                            </ul>
                                        </li>
                                        {!context.usuarioLogin && <li className="nav-item">
                                            <Link className="nav-link" to="/Registrarse">Registrarse</Link>
                                        </li>}
                                    </ul>
                                    <h5 className="usuarioLogin"> {context.nombreLogin}</h5>
                                    {estadoMostrarLogin && <Login estadoMostrarLogin={setEstadoMostrarLogin} />}
                                </div>
                            </div>
                        </nav>
                    </div>
                </>
            }
        </AppContext.Consumer>
    );

};


export default Menu;