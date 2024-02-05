const model = {};

model.table = "models";
model.mutableFields = ["models.Model_ID,models.Model_Name"];
model.idField = null;

model.buildReadQuery = () => {
  let sql = `SELECT ${model.mutableFields} FROM ${model.table}`;
  console.log("Fetched models");

  return sql;
};

export default model;
