import buildPreparedStatement from "../helperFunctions/buildPreparedStatement.js";

class Model {
  constructor(model) {
    this.table = model.table;
    this.mutableFields = model.mutableFields;
    this.idField = model.idField;
    this.buildReadQuery = model.buildReadQuery;
  }

  //Methods

  buildInsertSQL = () => {
    return `INSERT INTO  ${this.table} ` + buildPreparedStatement(this.mutableFields);
  };

  buildUpdateSQL = (id, record) => {
    const sql = `UPDATE ${this.table} ` + buildPreparedStatement(this.mutableFields) + ` WHERE ${this.idField}=:${this.idField}`;

    return { sql, data: { ...record, [this.idField]: id } };
  };

  buildDeleteSQL = (id) => {
    const sql = `DELETE FROM ${this.table} WHERE ${this.idField}=:${this.idField}`;
    return { sql, data: { [this.idField]: id } };
  };
}

export default Model;
