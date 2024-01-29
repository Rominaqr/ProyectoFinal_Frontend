import React, { useState, useEffect } from "react";
import connectionData from "../apiConnection/apiMethod";
import { useParams, useNavigate } from "react-router-dom";
import MensajeAlerta from "../components/MensajeAlerta";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const EditarPublicacion = () => {

    const [getState, setGetState] = useState({ titulo: "", imagen: "", descripcion: "" })
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [datosError, setDatosError] = useState(false);
    const { id } = useParams();
    const navegar = useNavigate();/*regresar al home*/


    const handlerSubmit = async (event) => {
        try {
            event.preventDefault();
            const datos = { titulo: getState.titulo, imagen: getState.imagen, descripcion: getState.descripcion }
            const apiDatos = {
                endpoint: "http://localhost:5000/publicaciones",
                method: "PUT",
                body: datos,
                direction: id,
                token: localStorage.getItem('token')
            }
            await connectionData(apiDatos);
            setDatosGuardados(true)
            setDatosError(false)
        } catch (error) {
            setDatosError(error.message)

        }
    }

    const handlerOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setGetState({ ...getState, [name]: value })

    }

    const handlerCancelar = () => {
        navegar("/home");
    }


    useEffect(() => {
        const fetchData = async () => {
            try {

                const apiDatos = {
                    endpoint: "http://localhost:5000/publicaciones",
                    method: "GET",
                    body: "",
                    direction: id,
                    token: localStorage.getItem('token')
                }
                const dato = await connectionData(apiDatos);
                setGetState(dato);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <Menu />
            <div className="container">
                <form onSubmit={handlerSubmit} >
                    <div className="row mb-5">
                        <h2>Editar publicación</h2>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Titulo</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="titulo" name="titulo" placeholder="Titulo" value={getState.titulo || ""} onChange={handlerOnchange}></input>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Imagen</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="imagen" name="imagen" placeholder="URL Imagen" value={getState.imagen || ""} onChange={handlerOnchange}></input>
                        </div>
                        <div className="p-3 text-justify">
                            <img src={getState.imagen || ""} className="img-thumbnail" alt={getState.titulo || ""}></img>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Descripción</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control form-control-lg" id="descripcion" name="descripcion" placeholder="Descripción" value={getState.descripcion || ""} onChange={handlerOnchange}></textarea>
                        </div>
                    </div>

                    <div className="mb-3">
                        {datosGuardados && <MensajeAlerta tipoMensaje="alert alert-success" mensaje="Los datos se han guardado correctamente." setAlertState={setDatosGuardados} />}
                        {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje={datosError} setAlertState={setDatosError} />}
                        <button type="submit" className="btn btn-primary mb-3" >Guardar</button>
                        <button type="button" className="btn btn-secondary mb-3" onClick={handlerCancelar} >Cancelar</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )

}

export default EditarPublicacion;