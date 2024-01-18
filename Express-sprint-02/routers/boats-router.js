import { Router } from "express";
import getBoatController from "../Controllers/getBoatController.js";
import addBoatController from "../Controllers/addBoatController.js";
import putBoatController from "../Controllers/putBoatController.js";
import deleteBoatController from "../Controllers/deleteBoatController.js";
import FormValidator from "../helperFunctions/validation.js";

const router = new Router();

router.get('/',(req,res)=> getBoatController(req,res)); // for all boats
//app.get('/status/:id', (req,res)=> getBoatController(req,res,"status")); // for boats with specific status
//app.get('/:id', (req,res)=> getBoatController(req,res,"primary")); // for a specific boat
router.get('/details/:id', (req,res)=> getBoatController(req,res))

router.post('/', FormValidator.validateAddBoatForm(),(req,res)=>addBoatController(req,res));
router.put('/:id',(req,res)=>putBoatController(req,res))
router.delete('/:id',(req,res)=>deleteBoatController(req,res))

export default router;