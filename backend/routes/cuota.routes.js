import { getCuotas, addCuota } from "../controllers/cuota.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getCuotas);
router.post("/", addCuota);

export default router;