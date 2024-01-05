import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";


const Card = (props) => {

    const handleEliminar = () => {
       props.referencia.current.scrollIntoView({ inline: "center" , behavior: "smooth", scrollMode: "always" })
        props.stateHomeEliminar({
            estado: true,
            id: props.id
        })

    }

    return (
        <>
            <div className="col-md-4 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                    <img src={props.imagen} className="card-img-top" alt={props.titulo}></img>
                    <div className="card-body">
                        <h5 className="card-title fw-bold fs-4 text-primary">{props.titulo}</h5>
                        <p className="card-text">{props.descripcion}</p>
                        <Link to={"/EditarPublicacion/" + props.id}><i className="fas fa-edit"></i></Link>
                        <button onClick={handleEliminar}><i className="fas fa-trash"></i> </button>
                        <Link to={"/mostrarPublicacion/" + props.id} className="btn btn-primary">Más información</Link>
                    </div>
                </div>
            </div >
        </>
    )

}

export default Card;