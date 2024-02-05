import database from "../database.js";

class Accessor {
  constructor(model) {
    this.model = model;
  }

  //methods-----
  create = async (record) => {
    try {
      const sql = this.model.buildInsertSQL();

      const status = await database.query(sql, record);

      const { isSuccess, result, message } = await this.read(status[0].insertId);

      return isSuccess
        ? { isSuccess: true, result: result, message: "Record found" }
        : {
            isSuccess: false,
            result: null,
            message: `Failed to recover the inserted record: ${message}`,
          };
    } catch (e) {
      return {
        isSuccess: false,
        result: null,
        message: `Failed to execute query: ${e.message}`,
      };
    }
  };

  read = async (id, status) => {
    let result = null;
    try {
      const sql = this.model.buildReadQuery(id, status);

      [result] = await database.query(sql);
      return result.length === 0 ? { isSuccess: false, result: null, message: "No record(s) found" } : { isSuccess: true, result: result, message: "Record(s) found" };
    } catch (e) {
      return {
        isSuccess: false,
        result: null,
        message: `Failed to execute query: ${e.message}`,
      };
    }
  };

  update = async (id, record) => {
    try {
      const { sql, data } = this.model.buildUpdateSQL(id, record);
      const status = await database.query(sql, data);

      if (status[0].affectedRows === 0) return { isSuccess: false, result: null, message: `Failed to update record: no rows affected` };

      const { isSuccess, result, message } = await this.read(id);

      return isSuccess
        ? { isSuccess: true, result: result, message: "Record found" }
        : { isSuccess: false, result: null, message: `Failed to recover the updated record: ${message}` };
    } catch (e) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${e.message}` };
    }
  };

  delete = async (id) => {
    try {
      const { sql, data } = this.model.buildDeleteSQL(id);
      const status = await database.query(sql, data);

      return status[0].affectedRows === 0
        ? { isSuccess: false, result: null, message: `Failed to delete record ${id}` }
        : { isSuccess: true, result: null, message: "Record deleted successfully" };
    } catch (e) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${e.message}` };
    }
  };
}

export default Accessor;
