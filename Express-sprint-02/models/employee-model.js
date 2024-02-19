const model = {};

model.table = "employees";
model.mutableFields = ["Employee_Name", "Job_ID", "Employee_Img"];
model.idField = "Employee_ID";

model.buildReadQuery = () => {
  const extendedTable = `${model.table} LEFT JOIN employeeStatus ON employees.Employee_Status_ID = employeeStatus.Employee_Status_ID
  LEFT JOIN jobs ON employees.Job_ID = jobs.Job_ID`;

  let extendedField = ["employees.Employee_ID, employees.Employee_Name, employeeStatus.Employee_Status, jobs.Job_Name, employees.Employee_Img"];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  return sql;
};

export default model;
