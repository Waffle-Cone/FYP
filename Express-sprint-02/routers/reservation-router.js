import { Router } from "express";
import getBoatReservationController from "../Controllers/getBoatReservationController.js";
import getItemReservationController from "../Controllers/getItemReservationController.js";


const router = new Router();

router.get('/boats/:id', (req,res)=>getBoatReservationController(req,res));
router.get('/items/:id', (req,res)=>getItemReservationController(req,res));

export default router;