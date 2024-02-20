const model = {};

model.table = "jobs";
model.mutableFields = ["Job_ID,Job_Name"];
model.idField = null;

model.buildReadQuery = () => {
  let sql = `SELECT ${model.mutableFields} from ${model.table}`;
  return sql;
};

export default model;
