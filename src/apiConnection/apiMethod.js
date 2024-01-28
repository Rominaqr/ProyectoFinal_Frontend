
const connectionData = async (datos) => {
    try {
        const requestOptions = {
            method: datos.method,
        };

        if (datos.token) {
            requestOptions.headers = {
                'Content-Type': 'application/json',
                'Authorization': datos.token
            }

        } else {
            requestOptions.headers = {
                'Content-Type': 'application/json'
            }

        };

        if (datos.body) {

            /*  requestOptions.headers = {
                  'Content-Type': 'application/json',
                  'Authorization': datos.token
              };*/

            requestOptions.body = JSON.stringify(datos.body);
        }

        const response = await fetch(datos.endpoint + '/' + datos.direction, requestOptions);
        if (!response.ok) {
            const errorMessage = await response.text();
            const errorObject = JSON.parse(errorMessage);
            throw new Error(`HTTP error! Status: ${response.status}, Error: ${JSON.stringify(errorObject)}`);
            
        }
        const data = await response.json();

        return data;

    }
    catch (err) {
        console.error("Ocurrio un error en la conección - " + err);
       /* throw new Error(`HTTP error! Status: ${err}`);*/
    }

}

export default connectionData;