import React from "react";
import PropTypes from 'prop-types';
import AppContext from "../context/appContext";
import connectionData from "../apiConnection/apiMethod";

const Comentario = (props) => {

    const handlerEliminar = async (event) => {
        event.preventDefault();

        try {
            const apiDatos = {
                endpoint: "http://localhost:5000/comentarios",
                method: "DELETE",
                body: "",
                direction: props.idPublicacion + "/" + props.idComentario,
                token: localStorage.getItem('token')
            }

            const result = await connectionData(apiDatos);/*api*/
            if (result.modifiedCount === 1) {
                props.setComentarios(true); /*renderizo padre*/
            }
            console.log(JSON.stringify(result))

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <AppContext.Consumer>
                {context =>
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{props.contenido}</li>
                        </ul>
                        <div className="fs-6 text-secondary">
                            <i className="fas fa-user"></i> {props.usuario}
                        </div>
                        <div>
                            {(context.usuarioLogin === props.usuario) && <button type="button" className="btn-link btn-sm" onClick={handlerEliminar}>Eliminar</button>}
                        </div>
                    </div>
                }

            </AppContext.Consumer>
        </>
    )

}

Comentario.proptype = {
    idPublicacion: PropTypes.string.isRequired,
    idComentario: PropTypes.string.isRequired,
    contenido: PropTypes.string.isRequired,
    usuario: PropTypes.string.isRequired,
    setComentarios: PropTypes.func.isRequired
}

export default Comentario;