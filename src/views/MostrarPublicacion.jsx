import { React, useState, useEffect } from "react";
import connectionData from "../apiConnection/apiMethod";
import { useParams } from "react-router-dom";
import Comentario from "../components/Comentarios";
import AgregarComentario from "../components/AgregarComentario";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import AppContext from "../context/appContext";

const MostrarPublicacion = () => {

    const { id } = useParams();/* id del route */
    const [publicacion, setPublicacion] = useState([]);
    const [comentarios, setComentarios] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiDatos = {
                    endpoint: "http://localhost:5000/publicaciones",
                    method: "GET",
                    body: "",
                    direction: id
                }

                const dato = await connectionData(apiDatos);
                setPublicacion(dato);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
       setComentarios(false);

        fetchData();
    }, [comentarios]);


    const handlerNuevoComentario = () => {
        setComentarios(true)
    }

    return (
        <AppContext.Consumer>
            {context =>
                <>
                    <Menu />
                    <div className="container">
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
                                        <Comentario key={index} idPublicacion={id} idComentario = {comentario._id} contenido={comentario.contenido} usuario={comentario.usuario} setComentarios = {setComentarios}/>
                                    ))}
                                {context.usuarioLogin && <AgregarComentario id={id} nuevoComentario={handlerNuevoComentario} />}
                            </div>
                        )}
                    </div>
                    <Footer />
                </>
            }
        </AppContext.Consumer>
    )

}

export default MostrarPublicacion;