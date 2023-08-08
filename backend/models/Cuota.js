import mongoose from "mongoose";

const cuotaSchema = mongoose.Schema({
    idPrestamo: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true,
    },
    numeroCuota: {
        type: Number,
        required: true,
    },
    fechaPago: {
        type: Date,
        required: false
    },
    restante: {
        type: Number,
        required: true
    }
},{
    timestamps : true
});

const Cuota = mongoose.model('cuota', cuotaSchema);

export default Cuota;