import { Router } from "express";
import {check} from "express-validator";
import {validateDocuments} from "../middlewares/validate.documents.js";
import { getCliente, getOneCliente, addCliente } from "../controllers/cliente.controller.js";

const router = Router();

router.get('/',getCliente);
router.get('/:id', getOneCliente);
router.post('/add',[
    check("identificacion", "Identificación es obligatoria").not().isEmpty(),
    check("nombre", "Nombre es obligatorio").not().isEmpty(),
    check("telefono", "Telefono es obligatorio").not().isEmpty().isLength({ min: 9 }).withMessage("El teléfono debe tener al menos 9 dígitos."),
    check("mail", "El correo no es válido").isEmail(),
    check("direccion", "Dirección no válida, debe tener más caracteres").isLength({min:5}),
    validateDocuments
],addCliente);

export default router;