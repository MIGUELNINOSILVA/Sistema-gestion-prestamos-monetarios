import Cuota from '../models/Cuota.js';

const getCuotas = async (req, res) => {
    try {
        const cuotas = await Cuota.find();
        res.json(cuotas);
    } catch (error) {
        res.status(500);
        res.send(error);
    };
}

const addCuota = async (req, res) => {
    const cuota = new Cuota(req.body);
    try {
        const nuevaCuota = await cuota.save();
        res.json(nuevaCuota);
    } catch (error) {
        res.status(500);
        res.send(error);
    };
}

export {
     getCuotas,
     addCuota
}