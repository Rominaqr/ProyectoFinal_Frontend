import React, { useContext, useState, useEffect, useRef } from "react";
import Card from "../components/card";
import connectionData from "../apiConnection/apiMethod";
import EliminarPublicacion from "../components/EliminarPublicacion";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import AppContext from "../context/appContext";


const Home = () => {

  const context = useContext(AppContext);
  const [publicaciones, setPublicaciones] = useState({});
  const [stateEliminarModif, setStateEliminarModif] = useState({ estado: false, id: "" });
  const RefMensaje = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiDatos = {
          endpoint: "http://localhost:5000/publicaciones",
          method: "GET",
          body: "",
          direction: context.valorBuscado.search ? "descripcion/" + context.valorBuscado.search : "",
          token: ""
        }
        const datos = await connectionData(apiDatos); /*Api get publicaciones*/

        setPublicaciones(datos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, [stateEliminarModif, context.valorBuscado]);

  return (
    <AppContext.Consumer>
      {context =>
        <>
          <Menu />
          <div ref={RefMensaje}>
            <div className="cuerpo">
              <div className="container">
                <div className="row">
                  {Array.isArray(publicaciones) && publicaciones.map((element, index) => (<Card key={index} titulo={element.titulo} imagen={element.imagen} descripcion={element.descripcion.substring(0, 50) + "..."} id={element._id} stateHomeEliminar={setStateEliminarModif} referencia={RefMensaje} usuario={element.usuario} />))
                  }
                </div>
              </div>
              <div>
                {stateEliminarModif.estado && <EliminarPublicacion id={stateEliminarModif.id} stateElimina={setStateEliminarModif} />}
              </div>
            </div>
          </div>
          <Footer />
        </>
      }
    </AppContext.Consumer>
  )

}

export default Home