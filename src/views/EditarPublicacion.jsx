import React, { useState, useEffect } from "react";
import { getByidPublicacion, putByidPublicacion } from "../components/apiMethod";
import { useParams, useNavigate } from "react-router-dom";
import MensajeAlerta from "../components/MensajeAlerta";

const EditarPublicacion = (props) => {

    const [getState, setGetState] = useState({ titulo: "", imagen: "", descripcion: "" })
    const [datosGuardados, setDatosGuardados] = useState(false);
    const { id } = useParams();
    const navegar = useNavigate();/*regresar al home*/


    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const datos = { titulo: getState.titulo, imagen: getState.imagen, descripcion: getState.descripcion }
            await putByidPublicacion(id, datos);
            setDatosGuardados(true)
        } catch (error) {

        }
    }

    const handleOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setGetState({ ...getState, [name]: value })

    }

    const handleCancelar = () => {
        navegar("/");
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dato = await getByidPublicacion(id);
                setGetState(dato);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit} >
                    <div className="row mb-5">
                        <h2>Editar publicación</h2>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Titulo</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="titulo" name="titulo" placeholder="Titulo" value={getState.titulo || ""} onChange={handleOnchange}></input>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Imagen</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-lg" id="imagen" name="imagen" placeholder="URL Imagen" value={getState.imagen || ""} onChange={handleOnchange}></input>
                        </div>
                        <div className="p-3 text-justify">
                            <img src={getState.imagen || ""} className="img-thumbnail" alt={getState.titulo || ""}></img>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label col-form-label-lg">Descripción</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control form-control-lg" id="descripcion" name="descripcion" placeholder="Descripción" value={getState.descripcion || ""} onChange={handleOnchange}></textarea>
                        </div>
                    </div>

                    <div className="mb-3">
                        {datosGuardados && <MensajeAlerta tipoMensaje="alert alert-success" mensaje="Los datos se han guardado correctamente." setAlertState={setDatosGuardados} />}
                        <button type="submit" className="btn btn-primary mb-3" >Guardar</button>
                        <button type="button" className="btn btn-secondary mb-3" onClick={handleCancelar} >Cancelar</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditarPublicacion;