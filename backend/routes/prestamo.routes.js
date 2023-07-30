import {Router} from "express";
import {check}  from "express-validator";
import {validateDocuments} from "../middlewares/validate.documents.js";
import { getPrestamos } from "../controllers/prestamo.controller.js";

const router = Router();

router.get('/', getPrestamos);

export default router;