const model = {};

model.table = "boatstatus";
model.mutableFields = ["Status_ID", "Status"];
model.idField = null;

model.buildReadQuery = () => {
  let sql = `SELECT ${model.mutableFields} from ${model.table}`;
  console.log("Feteched status");

  return sql;
};

export default model;
