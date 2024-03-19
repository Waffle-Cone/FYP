const model = {};

model.table = "boats";
model.mutableFields = ["Boat_Img", "Registration", "Model_ID", "Status_ID"];
model.idField = "Synthetic_Key";

model.buildReadQuery = (req) => {
  const status = req.params.status;
  const id = req.params.id;

  //normal /boats
  const extendedTable = `${model.table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
      LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
      LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID 
      LEFT JOIN boatstatus ON boats.Status_ID = boatstatus.Status_ID`;

  let extendedField = [
    "boats.Synthetic_Key,boats.Registration, boats.Boat_Img, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL,models.Model_Description, models.Weight_Limit_lbs,models.Seating,models.Fuel_Capacity_Gal, watercrafttypes.Type, boatstatus.Status, models.Model_ID, boatstatus.Status_ID",
  ];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

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
  /*
  if (insertID !== undefined) {
    sql += ` WHERE boats.Synthetic_key = ${insertID}`;
    console.log("insertID unlocked");
  }*/

  return sql;
};

export default model;
