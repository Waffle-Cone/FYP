const model = {};

model.table = "employeereservation";
model.mutableFields = ["Employee_ID", "EmployeeReservation_ID", "BoatReservation_ID"];
model.idField = "Synthetic_Key";

model.buildReadQuery = (id) => {
  const extendedTable = `${model.table} LEFT JOIN employees ON employeereservation.Employee_ID = employees.Employee_ID 
                                        LEFT JOIN boatReservation ON employeereservation.BoatReservation_ID = boatReservation.BoatReservation_ID 
                                        LEFT JOIN bookings ON boatreservation.Booking_Number = bookings.Booking_Number`;

  let extendedField = ["employees.Employee_ID, employeereservation.EmployeeReservation_ID, boatReservation.BoatReservation_ID, bookings.Booking_Number, bookings.Date"];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  if (id !== undefined) {
    console.log(id);
    sql += ` WHERE employeereservation.Synthetic_Key = ${id}`;
    console.log("id unlocked");
  }

  return sql;
};

export default model;
