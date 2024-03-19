const model = {};

model.table = "boatreservation";
model.mutableFields = ["Boatreservation_ID,Registration,Booking_Number"];
model.idField = "Boatreservation_ID";

model.buildReadQuery = (req) => {
  const id = req.params.id;
  const bookingNumber = req.params.bookingNumber;

  const extendedTable = `${model.table} LEFT JOIN boats ON boats.Registration = boatreservation.Registration
  LEFT JOIN models ON models.Model_ID = boats.Model_ID`;

  let extendedField = ["models.Model_Name, boatreservation.Boatreservation_ID"];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  if (bookingNumber !== undefined) {
    console.log("booking number unlocked");
    sql += ` WHERE boatreservation.Booking_Number = ${bookingNumber}`;
    console.log("booking unlocked");
  }

  if (id !== undefined) {
    sql += ` WHERE boatreservation.Boatreservation_ID = ${id}`;
    console.log("id unlocked");
  }

  return sql;
};

export default model;
