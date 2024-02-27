const model = {};

model.table = "employees";
model.mutableFields = ["Employee_Name", "Job_ID", "Employee_Img", "Start_Date"];
model.idField = "Employee_ID";

model.buildReadQuery = (id) => {
  const extendedTable = `${model.table} LEFT JOIN employeeStatus ON employees.Employee_Status_ID = employeeStatus.Employee_Status_ID
  LEFT JOIN jobs ON employees.Job_ID = jobs.Job_ID`;

  let extendedField = ["employees.Employee_ID,employees.Employee_Name,employeeStatus.Employee_Status,employees.Job_ID, jobs.Job_Name,employees.Employee_Img,employees.Start_Date"];

  let sql = `SELECT ${extendedField} FROM ${extendedTable}`;

  if (id !== undefined) {
    sql += ` WHERE employees.Employee_ID = ${id}`;
    console.log("id unlocked");
  }

  return sql;
};

export default model;
