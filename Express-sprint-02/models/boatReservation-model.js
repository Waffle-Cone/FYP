const model = {};

model.table = "boatreservation";
model.mutableFields = ["Boatreservation_ID,Registration,Booking_Number"];
model.idField = "Boatreservation_ID";

model.buildReadQuery = (id) => {
  const extendedTable = `${model.table} LEFT JOIN boats ON boats.Registration = boatreservation.Registration
  LEFT JOIN models ON models.Model_ID = boats.Model_ID`;

  let extendedField = ["models.Model_Name"];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  if (id !== undefined) {
    sql += ` WHERE boatreservation.Boatreservation_ID = ${id}`;
    console.log("id unlocked");
  }

  return sql;
};

export default model;
