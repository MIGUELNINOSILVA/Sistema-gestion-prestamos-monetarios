const clientesApi = "http://localhost:8002/api/clientes";


const getClientes = async() => {
    try {
        const req = await fetch(clientesApi);
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(error);
    };
    
}

export{
    getClientes
}