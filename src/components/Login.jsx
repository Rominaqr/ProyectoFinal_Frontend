import React, { useState, useContext } from "react";
import connectionData from "../apiConnection/apiMethod";
import MensajeAlerta from "./MensajeAlerta";
import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";
import AppContext from "../context/appContext";

const Login = (props) => {
    const context = useContext(AppContext);
    const [loginForm, setLoginForm] = useState({ email: '', password: '', repetirpassword: '' })
    const [datosError, setDatosError] = useState(false);
    const [mensajeError, setMensajeError] = useState();
    const navegar = useNavigate();

    const handleOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setLoginForm({ ...loginForm, [name]: value })

    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const apiDatos = {
                endpoint: "http://localhost:5000/usuarios",
                method: "GET",
                body: "",
                direction: loginForm.email + "/" + loginForm.password
            }

            const result = await connectionData(apiDatos); /*Api*/

            if (result) {
                if (loginForm.password === loginForm.repetirpassword) {

                    if (result.token) {
                        localStorage.setItem('usuario', result.usuario)
                        localStorage.setItem('nombre', result.nombre +', '+result.apellido)
                        localStorage.setItem('token', result.token)
                        context.setNombreLogin(result.nombre +', '+result.apellido)
                        context.setUsuarioLogin(result.usuario)
                        props.estadoMostrarLogin(false)
                        navegar("/home");
                    }
                    else {
                        setDatosError(true);
                        setMensajeError("Password incorrecta.")
                    }
                }
                else {
                    setDatosError(true);
                    setMensajeError("El password no coincide.")
                }

            } else {
                setDatosError(true);
                setMensajeError("Verifique los datos.")
            }
        }
        catch (error) {
            setDatosError(true);
            setMensajeError(error.message)
        }

    }

    const handleClose = () => {
        props.estadoMostrarLogin(false)
    }

    return (
        <>
            <div className="modal fade show" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="col-form-label">E-mail:</label>
                                    <input type="text" className="form-control" id="email" name="email" onChange={handleOnchange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Password:</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={handleOnchange}></input>
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">Repetir Password:</label>
                                    <input type="password" className="form-control" id="RepetirPassword" name="repetirpassword" onChange={handleOnchange}></input>
                                </div>
                            </form>
                        </div>

                        {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje={mensajeError} setAlertState={setDatosError} />}

                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Login.propTypes = {
    estadoMostrarLogin: PropTypes.func.isRequired,
};

export default Login;