const model = {};

model.table = "boats";
model.mutableFields = ["Boat_Img", "Registration", "Model_ID", "Status_ID"];
model.idField = "Synthetic_Key";

model.buildReadQuery = (req) => {
  const status = req.params.status;
  const id = req.params.id;
  const date = req.params.date;

  //normal /boats
  const extendedTable = `${model.table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
      LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
      LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID 
      LEFT JOIN boatstatus ON boats.Status_ID = boatstatus.Status_ID`;

  let extendedField = [
    "boats.Synthetic_Key,boats.Registration, boats.Boat_Img, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL,models.Model_Description, models.Weight_Limit_lbs,models.Seating,models.Fuel_Capacity_Gal, watercrafttypes.Type, boatstatus.Status, models.Model_ID, boatstatus.Status_ID",
  ];

  let sql = `SELECT ${extendedField} FROM ${extendedTable} ORDER BY models.Model_Name;`;

  // when status is set we use where clause
  if (status !== undefined) {
    sql += `WHERE boats.Status = ${status}`;
    console.log("id unlocked");
  }

  // when id is set we use where clause
  if (id !== undefined) {
    sql += ` WHERE boats.Synthetic_key = ${id}`;
    console.log("id unlocked");
  }

  if (date !== undefined) {
    sql = `SELECT boats.Registration, models.Model_Name
    FROM boats,models
    WHERE boats.Model_ID = models.Model_ID
    AND boats.Registration NOT IN 
    (SELECT boatreservation.Registration
    FROM bookings LEFT JOIN boatreservation ON bookings.Booking_Number = boatreservation.Booking_Number
    WHERE bookings.BookingDate BETWEEN '${date} 00:00:00' AND '${date} 23:59:59')
    ORDER BY models.Model_Name;`;

    console.log(`getting al boats availble on ${date}`);
  }

  return sql;
};

export default model;
