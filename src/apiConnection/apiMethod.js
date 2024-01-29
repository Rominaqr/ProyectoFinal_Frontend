
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
            let errorMessage;

            try {
                errorMessage = await response.text();
                const errorObject = JSON.parse(errorMessage);
                throw new Error(`HTTP error! Status: ${response.status}, Error: ${JSON.stringify(errorObject)}`);
            } catch (jsonError) {
                errorMessage = `HTTP error! Status: ${response.status}, Error: ${errorMessage}`;
                throw new Error(errorMessage);
            }
        }

        const data = await response.json();

        return data;

    }
    catch (err) {
       
        throw err; /*lanzo el error*/
    }

}

export default connectionData;