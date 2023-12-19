import { Router } from "express";
import getStatusController from "../Controllers/getStatusController.js";

const router = new Router();

router.get('/', (req,res)=>getStatusController(req,res));

export default router;