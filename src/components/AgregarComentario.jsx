import React, { useState } from "react";
import connectionData from "../apiConnection/apiMethod";
import PropTypes from 'prop-types';
import MensajeAlerta from "./MensajeAlerta";

const AgregarComentario = (props) => {

    const [comentario, setComentario] = useState([]);
    const [datosError, setDatosError] = useState(false);

    const handlerOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setComentario({ ...comentario, [name]: value })

    }

    const handlerPublicar = async (event) => {
        event.preventDefault();
        try {
            const newComentario = {
                contenido: comentario.contenido,
                publicacionId: props.id
            };

            const apiDatos = {
                endpoint: "http://localhost:5000/comentarios",
                method: "POST",
                body: newComentario,
                direction: "",
                token: localStorage.getItem('token')
            }

            const result = await connectionData(apiDatos);/*api*/
            if (result) {
                props.nuevoComentario(); /*actualizo estado componente padre para refrezcar el componente*/
                setComentario(" ") /*inicializo nuevamente*/
                setDatosError(False)
            }

        } catch (err) {
            console.log(err.message)
            setDatosError(err.message);
            /*  console.error('Ocurrió un error en la conexión, debe loguearse nuevamente.', err);*/


        }

    }

    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Añadir comentario" aria-label="Recipient's username" aria-describedby="button-addon2" name="contenido" value={comentario.contenido || ''} onChange={handlerOnchange} ></input>
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={handlerPublicar}>Publicar</button>
            </div>
            {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje={datosError} setAlertState={setDatosError} />}

        </>

    )

}

AgregarComentario.prototypes = {
    id: PropTypes.string.isRequired,
    nuevoComentario: PropTypes.func.isRequired
}

export default AgregarComentario;