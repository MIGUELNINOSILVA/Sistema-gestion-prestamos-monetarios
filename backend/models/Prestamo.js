import mongoose from "mongoose";

const prestamoSchema = mongoose.Schema({
    frecuenciaPago:{
        type: String,
        required: true,
        enum: ['diario', 'semanal', 'quincenal', 'mensual', 'unico'],
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    tasaInteres: {
        type: Number,
        required: false
    },
    interes: {
        type: Number,
        required: false
    },
    total : {
        type: Number,
        required: true
    },
    cantidadCuotas : {
        type : Number,
        required: true
    },
    valorCuota: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
});