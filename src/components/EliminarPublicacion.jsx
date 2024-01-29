import React from "react";
import connectionData from "../apiConnection/apiMethod";
import PropTypes from 'prop-types';

const EliminarPublicacion = (props) => {

    const handleEliminar = async (event) => {
        event.preventDefault();
        const apiDatos = {
            endpoint: "http://localhost:5000/publicaciones",
            method: "DELETE",
            body: "",
            direction: props.id,
            token: localStorage.getItem('token')
        }
        try {
            const result = await connectionData(apiDatos)
            if (result) {
                props.stateElimina({
                    estado: false,
                    id: ""
                })
            }
        } catch (err) {
            handleCancelar();
            alert(err.message); 
        }

    }

    const handleCancelar = () => {
        props.stateElimina({
            estado: false,
            id: ""
        })

    }


    return (
        <>
            <div className="toast-container p-3">
                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-body">
                        ¿Esta seguro que desea eliminar la publicación {props.id}?
                        <div className="mt-2 pt-2 border-top">
                            <button type="button" className="btn btn-primary btn-sm" onClick={handleEliminar}>Eliminar</button>
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="toast" onClick={handleCancelar}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

EliminarPublicacion.propTypes = {
    id: PropTypes.string.isRequired,
    stateElimina: PropTypes.func.isRequired
}

export default EliminarPublicacion;