// Imports ----------------------------------------------------------------
import appSetup from "./middleware.js";
import serverStart from "./serverStart.js";
import boatsRouter from "./routers/boats-router.js";
import modelsRouter from "./routers/models-router.js";
import statusRouter from "./routers/status-router.js";
 

//Configure express app with middleware --------------------------------------------------
const app = appSetup();

// Endpoints --------------------------------------------------------------
app.use('/api/boats',boatsRouter);
app.use('/api/model',modelsRouter);
app.use('/api/status',statusRouter);

// Start server -----------------------------------------------------------
serverStart(app);





