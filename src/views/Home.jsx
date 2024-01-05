import React from "react";
import Card from "../components/card";
import { useState, useEffect, useRef } from "react";
import { getAllPublicacion } from "../components/apiMethod";
import EliminarPublicacion from "../components/EliminarPublicacion";


const Home = () => {

  const [publicaciones, setPublicaciones] = useState({});
  const [stateEliminarModif, setStateEliminarModif] = useState({ estado: false, id: "" });
  const RefMensaje = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await getAllPublicacion();
        setPublicaciones(datos);
        console.log(publicaciones);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [stateEliminarModif]);

  return (
    <>
      <div ref={RefMensaje}>
        <div className="cuerpo">
          <div className="container">
            <div className="row">
              {Array.isArray(publicaciones) && publicaciones.map((element, index) => (<Card key={index} titulo={element.titulo} imagen={element.imagen} descripcion={element.descripcion} id={element._id} stateHomeEliminar={setStateEliminarModif} referencia={RefMensaje} />))
              }
            </div>
          </div>
          <div>
            {stateEliminarModif.estado && <EliminarPublicacion id={stateEliminarModif.id} stateElimina={setStateEliminarModif} />}
          </div>
        </div>
      </div>
    </>

  )

}

export default Home