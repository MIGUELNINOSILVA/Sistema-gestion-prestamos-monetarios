const clientesApi = "http://localhost:8002/api/clientes";
const prestamosApi = "http://localhost:8002/api/prestamos";

// Clientes
const getClientes = async () => {
    try {
        const req = await fetch(clientesApi);
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    };

}

const getOneClientes = async (id) => {
    try {
        const req = await fetch(`${clientesApi}/${id}`);
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    };

}

const updateClientes = async (id, data) => {
    try {
        const req = await fetch(`${clientesApi}/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return req.json();
    } catch (error) {
        console.log(error);
    };

}

const deleteClientes = async (id) => {
    try {
        const response = await fetch(`${clientesApi}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verificar si la eliminación se realizó correctamente
        if (response.ok) {
            const data = await response.json(); // Si el API responde con JSON
            return data; // Puedes retornar la respuesta del API si es necesario
        } else {
            // En caso de que la eliminación no sea exitosa, lanzar un error
            throw new Error('Error al eliminar el cliente');
        }
    } catch (error) {
        console.log('Error en la eliminación:', error.message);
        // Puedes hacer algo más aquí, como mostrar un mensaje de error en la interfaz de usuario
    }
};

// Prestamos
const getPrestamos = async () => {
    try {
        const req = await fetch(prestamosApi);
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    };
}

// const addPrestamo = async (data) => {
//     try {
//         const req = await fetch(`${prestamosApiration}/add/${}`)
//     } catch (error) {

//     }
// };

export {
    getClientes,
    getPrestamos,
    getOneClientes,
    updateClientes,
    deleteClientes
}