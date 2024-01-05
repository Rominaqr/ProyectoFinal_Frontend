import React from "react";
import { deleteByidPublicacion } from "./apiMethod"

const EliminarPublicacion = (props) => {

    const handleEliminar = async (event) => {
        event.preventDefault();
        await deleteByidPublicacion(props.id)
        props.stateElimina({
            estado: false,
            id: ""
        })

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

export default EliminarPublicacion;