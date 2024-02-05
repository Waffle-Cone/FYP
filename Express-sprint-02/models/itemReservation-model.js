const model = {};

model.table = "boats";
model.mutableFields = [" item.Item_Name,itemstatus.Item_Status"];
model.idField = "boats.Synthetic_key";

model.buildReadQuery = (id) => {
  const table = "boats";
  const extendedTable = `${model.table} LEFT JOIN boatreservation ON boats.Registration = boatreservation.Registration
          LEFT JOIN itemreservation ON boatreservation.BoatReservation_ID = itemreservation.BoatReservation_ID
          LEFT JOIN item ON itemreservation.Item_ID = item.Item_ID
          LEFT JOIN itemstatus ON item.Item_Status_ID = itemstatus.Item_Status_ID`;

  let sql = `SELECT ${model.mutableFields} FROM ${extendedTable} WHERE boats.Synthetic_key = ${id}`;

  return sql;
};

export default model;
