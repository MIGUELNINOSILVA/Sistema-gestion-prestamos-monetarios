const clientesApi = "http://localhost:8002/api/clientes";
const prestamosApi = "http://localhost:8002/api/prestamos";

// Clientes
const getClientes = async() => {
    try {
        const req = await fetch(clientesApi);
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    };
    
}

// Prestamos
const getPrestamos = async() => {
    try {
        const req  = await fetch(prestamosApi);
        const data  = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    };
    
}

export{
    getClientes,
    getPrestamos
}