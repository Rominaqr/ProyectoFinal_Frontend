import { React, useState, useEffect } from "react";
import { getByidPublicacion } from "../components/apiMethod";
import { useParams } from "react-router-dom";
import Comentario from "../components/Comentarios";
import AgregarComentario from "../components/AgregarComentario";

const MostrarPublicacion = (props) => {

    const { id } = useParams();/* id del route */
    const [publicacion, setPublicacion] = useState([]);
    const [comentarios, setComentarios] = useState([false]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dato = await getByidPublicacion(id);
                setPublicacion(dato);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [comentarios]);


    const handleNuevoComentario = () => {
        setComentarios([...comentarios, true])
    }

    return (

        <>
            <div clasName="container">
                {publicacion && (
                    <div className="card mb-3">
                        <img src={publicacion.imagen} className="card-img-top" alt={publicacion.titulo}></img>
                        <div className="card-body">
                            <h5 className="card-title fw-bold fs-4 text-primary">{publicacion.titulo}</h5>
                            <p className="card-text">{publicacion.descripcion}</p>
                            <i className="fas fa-comment-dots"> Cantidad comentarios {publicacion.comentarios?.length || 0}

                            </i>

                        </div>
                        {publicacion.comentarios &&
                            publicacion.comentarios.map((comentario, index) => (
                                <Comentario key={index} contenido={comentario.contenido} usuario={comentario.usuario} />
                            ))}
                        <AgregarComentario id={id} nuevoComentario={handleNuevoComentario} />
                    </div>
                )}
            </div>
        </>

    )

}

export default MostrarPublicacion;