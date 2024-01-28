import React, { useState } from "react";
import connectionData from "../apiConnection/apiMethod"
import MensajeAlerta from "../components/MensajeAlerta";
import Menu from "../components/Menu";
import Footer from "../components/Footer";


const Publicacion = () => {

  const [publicarForm, setPublicarForm] = useState({ titulo: '', imagen: '', descripcion: '' });
  const [datosGuardados, setDatosGuardados] = useState(false);
  const [datosError, setDatosError] = useState(false);
  const [usuarioLogin, setusuarioLogin] = useState(localStorage.getItem('usuario'));
  const mensaje = validarDatos(publicarForm);


  const handleOnchange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setPublicarForm({ ...publicarForm, [name]: value })

  }

  const handleSubmit = async (event) => {

    try {

      event.preventDefault();

      const apiDatos = {
        endpoint: "http://localhost:5000/publicaciones",
        method: "POST",
        body: publicarForm,
        direction: "",
        token: localStorage.getItem('token')
      }

      const result = await connectionData(apiDatos);/*Api*/

      if (result) {
        setPublicarForm({ titulo: '', imagen: '', descripcion: '' });
        setDatosGuardados(true);
        setDatosError(false);
      } else {
        setDatosError("Token Invalido");
        setDatosGuardados(false);

      }

    } catch (error) {
      console.log(error)
      setDatosError(error);
      setDatosGuardados(false);

    }
  }

  return (
    <>
      <Menu />
      <div className="container">
        <form onSubmit={handleSubmit} >
          <div className="row mb-5">
            <h2>Nueva publicación</h2>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-lg">Titulo</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-lg" id="titulo" name="titulo" placeholder="Titulo" value={publicarForm.titulo} onChange={handleOnchange}></input>
              <p className="text-sm-start" style={{ color: "red" }}>{mensaje.tituloMsg}</p>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-lg">Imagen</label>
            <div className="col-sm-10">
              <input type="text" className="form-control form-control-lg" id="imagen" name="imagen" placeholder="URL Imagen" value={publicarForm.imagen} onChange={handleOnchange}></input>
              <p className="text-sm-start" style={{ color: "red" }}>{mensaje.imagenMsg}</p>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-2 col-form-label col-form-label-lg">Descripción</label>
            <div className="col-sm-10">
              <textarea type="text" className="form-control form-control-lg" id="descripcion" name="descripcion" placeholder="Descripción" value={publicarForm.descripcion} onChange={handleOnchange}></textarea>
              <p className="text-sm-start" style={{ color: "red" }}>{mensaje.descripcionMsg}</p>
            </div>
          </div>

          <div className="mb-3">
            {datosGuardados && <MensajeAlerta tipoMensaje="alert alert-success" mensaje="Los datos se han guardado correctamente." setAlertState={setDatosGuardados} />}
            {datosError && <MensajeAlerta tipoMensaje="alert alert-danger" mensaje={datosError} setAlertState={setDatosError} />}
            <button type="submit" className="btn btn-primary mb-3" >Publicar</button>
          </div>
        </form>
      </div>
      <Footer />
    </>

  )

}

const validarDatos = (datos) => {

  const mensajeObj = {
    tituloMsg: '',
    imagenMsg: '',
    descripcionMsg: ''
  };

  if (datos.titulo.length === 0) {
    const mensajeObj = {
      tituloMsg: 'Campo Titulo obligatorio',
      imagenMsg: '',
      descripcionMsg: ''
    };
    return mensajeObj;
  } else {
    if (datos.imagen.length === 0) {
      const mensajeObj = {
        tituloMsg: '',
        imagenMsg: 'Campo Imagen obligatorio',
        descripcionMsg: ''
      };
      return mensajeObj;
    } else {
      if (datos.descripcion.length === 0) {
        const mensajeObj = {
          tituloMsg: '',
          imagenMsg: '',
          descripcionMsg: 'Campo Descripción obligatorio'
        };
        return mensajeObj;
      }
    }
  }
  return mensajeObj;
}

export default Publicacion