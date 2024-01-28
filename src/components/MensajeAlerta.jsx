import React, { useEffect } from "react";
import PropTypes from 'prop-types';

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
            <div className={props.tipoMensaje} role="alert">
                {props.mensaje}
            </div>
        </>
    )

}

MensajeAlerta.propTypes = {
    setAlertState: PropTypes.func.isRequired,
    mensaje: PropTypes.string.isRequired,
    tipoMensaje: PropTypes.string.isRequired
}

export default MensajeAlerta;