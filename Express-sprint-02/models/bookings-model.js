const model = {};

model.table = "boats";
model.mutableFields = ["bookings.Booking_Notes,bookings.Date,bookings.Duration,bookings.Charter_Type_ID"];
model.idField = "bookings.Booking_Number";

model.buildReadQuery = (id) => {
  const extendedTable = `${model.table} LEFT JOIN boatreservation ON boats.Registration = boatreservation.Registration
          LEFT JOIN bookings ON boatreservation.Booking_Number = bookings.Booking_Number
          LEFT JOIN chartertype ON bookings.Charter_Type_ID = chartertype.Charter_Type_ID`;

  let sql = `SELECT ${model.mutableFields} FROM ${extendedTable}`;

  if (id !== undefined) {
    sql += ` WHERE bookings.Booking_Number = ${id}`;
    console.log("id unlocked");
  }

  return sql;
};

export default model;
