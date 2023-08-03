import Prestamo from "../models/Prestamo.js";

const getPrestamos = async(req, res) => {
    try {
        const prestamo = await  Prestamo.find();
        res.json(prestamo);
    } catch (error) {
        res.status(500);
        res.send(error);
    };   
}

const addPrestamo = async (req, res) => {
    const prestamo = new Prestamo(req.body);
    try {

        const nuevoPrestamo = await prestamo.save();
        res.json(nuevoPrestamo);
    } catch (error) {
        res.status(500);
        res.send(error);
    };
}

export{
    getPrestamos,
    addPrestamo
}