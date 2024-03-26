const model = {};

model.table = "chartertype";
model.mutableFields = ["Charter_Type_ID", "Charter_Name", "Charter_Description"];
model.idField = null;

model.buildReadQuery = () => {
  let extendedField = ["Charter_Type_ID, Charter_Name"];
  let sql = `SELECT ${extendedField} from ${model.table}`;
  console.log("Feteched charter types");

  return sql;
};

export default model;
