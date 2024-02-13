// Imports ----------------------------------------------------------------
import appSetup from "./middleware.js";
import serverStart from "./serverStart.js";
import boatsRouter from "./routers/boats-router.js";
import modelsRouter from "./routers/models-router.js";
import statusRouter from "./routers/status-router.js";
import boatReservationRouter from "./routers/boatReservation-router.js";
import itemReservation from "./routers/itemReservation-router.js";
import employeeRouter from "./routers/employees-router.js";

//Configure express app with middleware --------------------------------------------------
const app = appSetup();

// Endpoints --------------------------------------------------------------
app.use("/api/boats", boatsRouter);
app.use("/api/model", modelsRouter);
app.use("/api/status", statusRouter);
app.use("/api/boatreservations", boatReservationRouter);
app.use("/api/itemreservations", itemReservation);
app.use("/api/employees", employeeRouter);

// Start server -----------------------------------------------------------
serverStart(app);
