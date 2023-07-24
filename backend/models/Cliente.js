import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    identificacion: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    mail: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: true
    }
});

const Cliente = mongoose.model('cliente', clienteSchema);

export default Cliente;