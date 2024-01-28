import React, { useState } from "react";
import connectionData from "../apiConnection/apiMethod";
import PropTypes from 'prop-types';

const AgregarComentario = (props) => {

    const [comentario, setComentario] = useState([]);

    const handleOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setComentario({ ...comentario, [name]: value })

    }

    const handlePublicar = async (event) => {
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
            props.nuevoComentario(); /*actualizo estado componente padre para refrezcar el componente*/

            setComentario(" ") /*inicializo nuevamente*/
        } catch (err) {
            console.error('Ocurrió un error en la conexión, debe loguearse nuevamente.', err);

            if (err.response) {
                // Si la excepción tiene una propiedad 'response', significa que proviene de una respuesta HTTP
                console.error('Respuesta del servidor:', err.response.data);
            }
        }

    }

    return (
        <>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Añadir comentario" aria-label="Recipient's username" aria-describedby="button-addon2" name="contenido" value={comentario.contenido || ''} onChange={handleOnchange} ></input>
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={handlePublicar}>Publicar</button>
            </div>
        </>

    )

}

AgregarComentario.prototypes = {
    id: PropTypes.string.isRequired,
    nuevoComentario: PropTypes.func.isRequired
}

export default AgregarComentario;