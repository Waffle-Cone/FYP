const model = {};

model.table = "boats";
model.mutableFields = ["bookings.Booking_Notes,bookings.Date,bookings.Duration,bookings.Charter_Type_ID"];
model.idField = "boats.Synthetic_key";

model.buildReadQuery = (id) => {
  const extendedTable = `${model.table} LEFT JOIN boatreservation ON boats.Registration = boatreservation.Registration
          LEFT JOIN bookings ON boatreservation.Booking_Number = bookings.Booking_Number
          LEFT JOIN chartertype ON bookings.Charter_Type_ID = chartertype.Charter_Type_ID`;

  let sql = `SELECT ${model.mutableFields} FROM ${extendedTable} WHERE boats.Synthetic_key = ${id}`;

  return sql;
};

export default model;
