import React, {useEffect} from "react";

const MensajeAlerta = (props) => {

    useEffect(() => {
        const tiempo = 1500;
    
        const temporizador = setTimeout(() => {
            props.setAlertState(false);
        }, tiempo);
    
        return () => clearTimeout(temporizador);
      }, [props.setAlertState]);
    

    return (
        <>
            <div className= {props.tipoMensaje} role="alert">
                {props.mensaje}
            </div>
        </>
    )

}

export default MensajeAlerta;