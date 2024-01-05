import React from "react";

const Comentario = (props) => {

    return (
        <>
            <div className="card" style={{ width: "55.5rem" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{props.contenido}</li>
                </ul>
                <div className="card-footer">
                <i className="fas fa-user"></i> {props.usuario}
                </div>
            </div>
        </>
    )

}

export default Comentario;