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

const getOnePrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findOne({
            _id: req.params.id
        });
        res.json(prestamo);
    } catch (error) {
        res.status(500);
        res.send(error);
    };

}

const updatePrestamo = async(req, res) => {
    try {
        let updatePrestamo = await Prestamo.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
        res.json(updatePrestamo);
    } catch (error) {
        res.status(500).send(error);
    };
    
}

export{
    getPrestamos,
    getOnePrestamo,
    addPrestamo,
    updatePrestamo
}