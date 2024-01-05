const createPublicacion = async (publicacion) => {

    console.log(publicacion);
    try {
        const response = await fetch('http://localhost:5000/publicaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publicacion),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


const getAllPublicacion = async () => {
    try {
        const response = await fetch("http://localhost:5000/publicaciones", {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Users not found");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
        return [];
    }

};


const getByidPublicacion = async (id) => {
    try {
        const response = await fetch("http://localhost:5000/publicaciones/" + id, {
            method: "GET",
        });
        if (!response.ok) {
            throw new Error("Users not found");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return [];
    }

};


const deleteByidPublicacion = async (id) => {
    try {
        const response = await fetch("http://localhost:5000/publicaciones/" + id, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Publicación not found");
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return [];
    }

};


const agregarComentario = async (datos) => {

    try {
        const response = await fetch('http://localhost:5000/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }

}


const putByidPublicacion = async (id, datos) => {
    try {
        const response = await fetch("http://localhost:5000/publicaciones/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            throw new Error("Publicación not found");
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        return [];
    }

};


export { createPublicacion, getAllPublicacion, getByidPublicacion, agregarComentario, deleteByidPublicacion, putByidPublicacion }