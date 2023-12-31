import {Router} from "express";
import {check}  from "express-validator";
import {validateDocuments} from "../middlewares/validate.documents.js";
import { getPrestamos, addPrestamo, getOnePrestamo, updatePrestamo, deletePrestamo} from "../controllers/prestamo.controller.js";

const router = Router();

router.get('/', getPrestamos);
router.get('/:id', getOnePrestamo);
router.post('/add', [
    check("idCliente", "idCliente es obligatorio").not().isEmpty(),
    check("frecuenciaPago", "frecuenciaPago es obligatorio").not().isEmpty(),
    check("frecuenciaPago", "frecuenciaPago es obligatorio").not().isEmpty(),
    check("fechaInicio", "fechaInicio es obligatorio").not().isEmpty(),
    check("fechaFin", "fechaFin es obligatorio").not().isEmpty(),
    check("monto", "monto es obligatorio").not().isEmpty(),
    check("tasaInteres", "tasaInteres es obligatorio").not().isEmpty(),
    check("interes", "interes es obligatorio").not().isEmpty(),
    check("cantidadCuotas", "cantidadCuotas es obligatorio").not().isEmpty(),
    check("estado", "estado es obligatorio").not().isEmpty(),
    validateDocuments
],addPrestamo);
router.patch('/update/:id', updatePrestamo);
router.delete('/delete/:id', deletePrestamo)

export default router;