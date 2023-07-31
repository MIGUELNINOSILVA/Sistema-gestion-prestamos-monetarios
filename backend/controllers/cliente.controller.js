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
        const cliente = await Cliente.findOne({
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

const deleteCliente = async(req, res) => {
    try {
        await Cliente.deleteOne({_id:req.params.id});
        res.status(200).send({respuesta: "Eliminado Correctamente"});
    } catch (error) {
        res.status(500).send(error);
    };
    
}

const updateCliente = async(req, res) => {
    try {
        let updateCliente = await Cliente.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
        res.json(updateCliente);
    } catch (error) {
        res.status(500).send(error);
    };
    
}

export {
    getCliente,
    getOneCliente,
    addCliente,
    deleteCliente,
    updateCliente
}