import React, { useContext } from "react";
import AppContext from "../context/appContext";

const Search = () => {

    const context = useContext(AppContext);

    const handleOnchange = (event) => {
        const name = event.target.name
        const value = event.target.value
        context.setvalorBuscado({ ...context.valorBuscado, [name]: value })

    }

    const handleSearch = () => {

    }

    return (
        <AppContext.Consumer>
            {context =>
                <div className="top">
                    <div className="container search-container" id="search-container">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-4">
                                <div className="top-search">
                                    <div id="search" className="input-group">
                                        <input type="text" name="search" placeholder="Busqueda en descripción" className="form-control" value={context.valorBuscado.search || ''} onChange={handleOnchange} />
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-default btn-lg"><i className="fa fa-search"></i></button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </AppContext.Consumer>
    );

};

export default Search;