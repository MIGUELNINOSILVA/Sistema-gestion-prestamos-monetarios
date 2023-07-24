import Cliente from "../models/Cliente.js";

const getCliente = async (req, res) => {
    try {
        const cliente = await Cliente.find();
        res.json(cliente);
    } catch (error) {
        res.status(500);
        res.send(error);
    };
}

const getOneCliente = async (req, res) => {
    try {
        const cliente = await Client.findOne({
            _id: req.params.id
        });
        res.json(cliente);
    } catch (error) {
        res.status(500);
        res.send(error);
    };

}

const addCliente = async (req, res) => {
    const cliente = new Cliente(req.body);
    const {
        identificacion
    } = cliente;
    try {
        /* Verificar si hay cliente con esa identificacion */
        const identificacionExistente = await Cliente.findOne({
            identificacion
        });
        if (identificacionExistente) {
            return res.status(400).json({
                error : "Cliente ya registrado en la base de datos"
            });
        }
        const nuevoCliente = await cliente.save();
        res.json(nuevoCliente);
    } catch (error) {
        res.status(500);
        res.send(error);
    };

}

export {
    getCliente,
    getOneCliente,
    addCliente
}