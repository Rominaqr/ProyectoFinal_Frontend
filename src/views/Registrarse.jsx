import React, { useState } from "react";
import connectionData from '../apiConnection/apiMethod.js'
import MensajeAlerta from "../components/MensajeAlerta";
import Menu from "../components/Menu.jsx"
import Footer from "../components/Footer.jsx";

const Registrarse = () => {

    const [usuarioForm, setUsuarioForm] = useState({ nombre: '', apellido: '', usuario: '', email: '', password: '' });
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [datosError, setDatosError] = useState(false);
  
    const handleOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setUsuarioForm({ ...usuarioForm, [name]: value })
    }


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();

            const apiDatos = {
                endpoint: "http://localhost:5000/usuarios",
                method: "POST",
                body: usuarioForm,
                direction: ""
            }

            const result = await connectionData(apiDatos);/*Api Registración*/
        
            if (result) {
                setDatosGuardados(true);
                setDatosError(false);
                setUsuarioForm({ nombre: '', apellido: '', usuario: '', email: '', password: '' });

            } else {
                setDatosError(true);
                setDatosGuardados(false);
              /*  throw new Error(`HTTP error!}`);*/

            }

        } catch (err) {
            setDatosError(err.message);
            setDatosGuardados(false);
        }
    }

    return (
        <>
            <Menu/>
            <div className="container">
                <form onSubmit={handleSubmit} >
                    <div className="row mb-5">
                        <h2>Registración</h2>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Nombre Usuario</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="usuario" name="usuario" placeholder="Nombre de Usuario" value={usuarioForm.usuario} onChange={handleOnchange}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">E-mail</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="email" name="email" placeholder="E-Mail" value={usuarioForm.email} onChange={handleOnchange}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Nomre</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="nombre" name="nombre" placeholder="Nombre" value={usuarioForm.nombre} onChange={handleOnchange}></input>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Apellido</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="apellido" name="apellido" placeholder="Apellido" value={usuarioForm.apellido} onChange={handleOnchange}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control form-control-lg" id="password" name="password" placeholder="Password" value={usuarioForm.password} onChange={handleOnchange}></input>
                        </div>
                    </div>

                    <div className="mb-3">
                        {datosGuardados && <MensajeAlerta tipoMensaje="alert alert-success" mensaje="Los datos se han guardado correctamente." setAlertState={setDatosGuardados} />}
                        {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje={datosError} setAlertState={setDatosError} />}
                        <button type="submit" className="btn btn-primary mb-3" >Guardar</button>
                    </div>

                </form>
            </div>
            <Footer />
        </>
    );

}

export default Registrarse;