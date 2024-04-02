// Imports ----------------------------------------------------------------
import appSetup from "./middleware.js";
import serverStart from "./serverStart.js";
import boatsRouter from "./routers/boats-router.js";
import modelsRouter from "./routers/models-router.js";
import statusRouter from "./routers/status-router.js";
import bookingsRouter from "./routers/bookings-router.js";
import charterRouter from "./routers/charterType-router.js";
import itemReservation from "./routers/itemReservation-router.js";
import employeeRouter from "./routers/employees-router.js";
import employeeReservationRouter from "./routers/employeeReservation-router.js";
import boatsReservationsRouter from "./routers/boatReservation-router.js";
import jobsRouter from "./routers/jobs-router.js";
import accountRouter from "./routers/account-router.js";

//Configure express app with middleware --------------------------------------------------
const app = appSetup();

// Endpoints --------------------------------------------------------------
app.use("/api/boats", boatsRouter);
app.use("/api/boatsreservations", boatsReservationsRouter);
app.use("/api/model", modelsRouter);
app.use("/api/status", statusRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/charters", charterRouter);
app.use("/api/itemreservations", itemReservation);
app.use("/api/employees", employeeRouter);
app.use("/api/employeereservations", employeeReservationRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/accounts", accountRouter);

// Start server -----------------------------------------------------------
serverStart(app);
