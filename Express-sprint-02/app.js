// Imports ----------------------------------------------------------------
import appSetup from "./middleware.js";
import serverStart from "./serverStart.js";
import boatsRouter from "./routers/boats-router.js";
import modelsRouter from "./routers/models-router.js";
import statusRouter from "./routers/status-router.js";
import bookingsRouter from "./routers/bookings-router.js";
import itemReservation from "./routers/itemReservation-router.js";
import employeeRouter from "./routers/employees-router.js";
import employeeReservationRouter from "./routers/employeeReservation-router.js";
import jobsRouter from "./routers/jobs-router.js";

//Configure express app with middleware --------------------------------------------------
const app = appSetup();

// Endpoints --------------------------------------------------------------
app.use("/api/boats", boatsRouter);
app.use("/api/model", modelsRouter);
app.use("/api/status", statusRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/itemreservations", itemReservation);
app.use("/api/employees", employeeRouter);
app.use("/api/employeereservation", employeeReservationRouter);
app.use("/api/jobs", jobsRouter);

// Start server -----------------------------------------------------------
serverStart(app);
