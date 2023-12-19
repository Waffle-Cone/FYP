import { Router } from "express";
import getModelController from "../Controllers/getModelController.js";

const router = new Router();

router.get('/', (req,res)=>getModelController(req,res)); // get model name

export default router;