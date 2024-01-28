import React from "react"
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AppContext from "../context/appContext";

const Card = (props) => {

    const handlerEliminar = () => {
        props.referencia.current.scrollIntoView({ inline: "center", behavior: "smooth", scrollMode: "always" })
        props.stateHomeEliminar({
            estado: true,
            id: props.id
        })

    }

    return (
        <AppContext.Consumer>
            {constext =>
                <>
                    <div className="col-md-4 mb-4">
                        <div className="card" style={{ width: '18rem' }}>
                            <img src={props.imagen} style={{ height: '10rem' }} className="card-img-top" alt={props.titulo}></img>
                            <div className="card-body">
                                <h5 className="card-title fw-bold fs-4 text-primary">{props.titulo}</h5>
                                <p className="card-text">{props.descripcion}</p>
                                <p className="fs-6 text-primary">Usuario: {props.usuario}</p>
                                {(constext.usuarioLogin === props.usuario) && <Link to={"/EditarPublicacion/" + props.id}><i className="fas fa-edit"></i></Link>}
                                {(constext.usuarioLogin === props.usuario) && <button onClick={handlerEliminar}><i className="fas fa-trash"></i> </button>}
                                <Link to={"/mostrarPublicacion/" + props.id} className="btn btn-primary">Más información</Link>
                            </div>
                        </div>
                    </div >
                </>
            }
        </AppContext.Consumer>
    )

}

Card.propTypes = {
    titulo: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    stateHomeEliminar: PropTypes.func.isRequired,
    referencia: PropTypes.object.isRequired,
    usuario: PropTypes.string
};


export default Card;