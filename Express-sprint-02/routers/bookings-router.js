import { Router } from "express";
import Model from "../models/Model.js";
import modelConfig from "../models/bookings-model.js";
import Accessor from "../accessor/Accessor.js";
import Controller from "../controller/Controller.js";
import FormValidator from "../helperFunctions/validation.js";

//model------------------------------
const model = new Model(modelConfig);

//Accessor------------------------------
const accessor = new Accessor(model);
//Controller----------------------------
const controller = new Controller(accessor);

const router = new Router();
router.get("/", (req, res) => controller.get(req, res));
router.get("/:id", (req, res) => controller.get(req, res));
router.post("/", FormValidator.validateAddBookingForm(), (req, res) => controller.post(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
