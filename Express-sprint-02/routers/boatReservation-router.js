import { Router } from "express";
import Model from "../models/Model.js";
import modelConfig from "../models/boatReservation-model.js";
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";

//model------------------------------
const model = new Model(modelConfig);

//Accessor------------------------------
const accessor = new Accessor(model);
//Controller----------------------------
const controller = new Controller(accessor);

const router = new Router();
router.get("/", (req, res) => controller.get(req, res));
router.get("/:id", (req, res) => controller.get(req, res));

export default router;
