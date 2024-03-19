const model = {};

model.table = "bookings";
model.mutableFields = ["Booking_Notes,Date,Duration,Charter_Type_ID"];
model.idField = "bookings.Booking_Number";

model.buildReadQuery = (id) => {
  const extendedTable = `${model.table} RIGHT JOIN chartertype ON bookings.Charter_Type_ID = chartertype.Charter_Type_ID`;

  let extendedField = ["bookings.Booking_Number,bookings.Booking_Notes, bookings.BookingDate, bookings.Duration,chartertype.Charter_Name"];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  if (id !== undefined) {
    sql += ` WHERE bookings.Booking_Number = ${id}`;
    console.log("id unlocked");
  }

  return sql;
};

export default model;
