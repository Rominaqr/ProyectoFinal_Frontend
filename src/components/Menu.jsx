import React from "react";
import { Link } from "react-router-dom";


const Menu = () => {

    return (
        <>
            <header className="text-center" name="home">
                <div className="intro-text">
                    <h1 className="wow fadeInDown">Bienvenido <strong><span className="color"> a mis Viajes</span></strong></h1>
                    <p className="wow fadeInDown">Porfolio de Viajes</p>
                </div>
            </header>
            <div className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <i className="fas fa-home"> </i> <Link className="navbar-brand" to="/">Home</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarScroll">
                            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll navmenu">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Publicar">Publicar</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Usuario
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                                        <li><a className="dropdown-item" href="#">Login</a></li>
                                        <li><a className="dropdown-item" href="#">Logout</a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled">Registrarse</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );

};

export default Menu;