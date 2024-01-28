import { React, useState } from "react";
import AppContext from "./appContext";

function GlobalState({ children }) {
    const [nombreLogin, setNombreLogin] = useState(localStorage.getItem('nombre'));
    const [usuarioLogin, setUsuarioLogin] = useState(localStorage.getItem('usuario'));
     const [valorBuscado, setvalorBuscado] = useState([]);


    return (

        <AppContext.Provider
            value={{
                setvalorBuscado,
                valorBuscado,
                nombreLogin,
                setNombreLogin,
                setUsuarioLogin,
                usuarioLogin
            }}
        >
            {children}
        </AppContext.Provider>

    )

}

export default GlobalState;