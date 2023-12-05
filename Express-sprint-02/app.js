// Imports ----------------------------------------------------------------
import appSetup from "./middleware.js";
import serverStart from "./serverStart.js";
import FormValidator from "./helperFunctions/validation.js";
import getBoatController from "./Controllers/getBoatController.js";
import getModelController from "./Controllers/getModelController.js";
import getStatusController from "./Controllers/getStatusController.js";
import addBoatController from "./Controllers/addBoatController.js";
import putBoatController from "./Controllers/putBoatController.js";

//Configure express app with middleware --------------------------------------------------
const app = appSetup();

// Endpoints --------------------------------------------------------------
//get
app.get('/api/boats',(req,res)=> getBoatController(req,res)); // for all boats
//app.get('/api/boats/status/:id', (req,res)=> getBoatController(req,res,"status")); // for boats with specific status
//app.get('/api/boats/:id', (req,res)=> getBoatController(req,res,"primary")); // for a specific boat


app.get('/api/model', (req,res)=>getModelController(req,res)); // get model name
app.get('/api/status', (req,res)=>getStatusController(req,res));

//posting a new boat
app.post('/api/boats', FormValidator.validateAddBoatForm(),(req,res)=>addBoatController(req,res));

//updating/ modifying a boat
app.put('/api/boats/:id',FormValidator.validateAddBoatForm(),(req,res)=>putBoatController(req,res))
//app.put('/api/boats/:id',(req,res)=>deleteBoatController(req,res))

// Start server -----------------------------------------------------------
serverStart(app);





