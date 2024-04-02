const model = {};

model.table = "accounts";
model.mutableFields = [""];
model.idField = "ID";

model.buildReadQuery = (req) => {
  const password = req.params.password;
  const username = req.params.username;

  console.log(password);
  console.log(username);

  let sql = `
  SELECT *
  FROM accounts
  WHERE accounts.ID = ${username}
  AND accounts.Password = '${password}';`;

  console.log(sql);

  return sql;
};

export default model;
