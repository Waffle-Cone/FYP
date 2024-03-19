const model = {};

model.table = "employeereservation";
model.mutableFields = ["Employee_ID", "EmployeeReservation_ID", "BoatReservation_ID"];
model.idField = "Synthetic_key";

model.buildReadQuery = (req) => {
  const id = req.params.id;
  const boatReservation = req.params.boatreservation;

  const extendedTable = `${model.table} LEFT JOIN employees ON employeereservation.Employee_ID = employees.Employee_ID 
  LEFT JOIN jobs ON employees.Job_ID = jobs.Job_ID
  LEFT JOIN boatReservation ON employeereservation.BoatReservation_ID = boatReservation.BoatReservation_ID 
  LEFT JOIN boats ON boatreservation.Registration = boats.Registration
  LEFT JOIN models ON boats.Model_ID = models.Model_ID
  LEFT JOIN bookings ON boatreservation.Booking_Number = bookings.Booking_Number`;

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

  return sql;
};

export default model;
