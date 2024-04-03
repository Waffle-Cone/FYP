const model = {};

model.table = "employeereservation";
model.mutableFields = ["Employee_ID", "EmployeeReservation_ID", "BoatReservation_ID"];
model.idField = "Synthetic_key";

model.buildReadQuery = (req) => {
  const id = req.params.id;
  const boatReservation = req.params.boatreservation;
  const employeeID = req.params.employeeID;

  const extendedTable = `${model.table} LEFT JOIN employees ON employeereservation.Employee_ID = employees.Employee_ID 
  LEFT JOIN jobs ON employees.Job_ID = jobs.Job_ID
  LEFT JOIN boatReservation ON employeereservation.BoatReservation_ID = boatReservation.BoatReservation_ID 
  LEFT JOIN boats ON boatreservation.Registration = boats.Registration
  LEFT JOIN models ON boats.Model_ID = models.Model_ID
  LEFT JOIN bookings ON boatreservation.Booking_Number = bookings.Booking_Number
  LEFT JOIN chartertype ON bookings.Charter_Type_ID = chartertype.Charter_Type_ID`;

  let extendedField = [
    "employees.Employee_Name,employees.Employee_ID, employeereservation.EmployeeReservation_ID, boatReservation.BoatReservation_ID, bookings.Booking_Number, bookings.BookingDate, models.Model_Name, jobs.Job_Name",
  ];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  if (boatReservation !== undefined) {
    console.log(boatReservation);
    sql += ` WHERE employeereservation.BoatReservation_ID  = ${boatReservation}`;
    console.log("boatReservation unlocked");
  }

  if (id !== undefined) {
    console.log(id);
    sql += ` WHERE bookings.Booking_Number = ${id}`;
    console.log("id unlocked");
  }

  if (employeeID !== undefined) {
    extendedField = ["bookings.Booking_Number,bookings.Booking_Notes, bookings.BookingDate, bookings.Duration,chartertype.Charter_Name"];
    sql = `SELECT ${extendedField} FROM ${extendedTable}`;
    sql += ` WHERE employeereservation.Employee_ID = ${employeeID}`;
    console.log("employee unlocked");
  }

  return sql;
};

export default model;
