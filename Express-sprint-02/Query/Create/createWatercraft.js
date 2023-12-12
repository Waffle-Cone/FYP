import database from "../../database.js";
import buildWatercraftSelectSQL from "../Build_SQL/buildWatercraftSelectSQL.js";
import Query from "../Query.js";

const createWatercraft = async (sql,record) => {
    try {

        const status = await database.query(sql,record);
        console.log("Hello"+ status[0].insertId)

        const recoverRecordSql = buildWatercraftSelectSQL(status[0].insertId)

        const {isSuccess, result, message} = await Query.read(recoverRecordSql);

        return isSuccess
        ? { isSuccess:true, result: result, message:"Record found"}
        : { isSuccess:false, result:null,message:`Failed to recover the inserted record: ${message}`};

    }
    catch(e) {
       return{isSuccess:false, result: null, message: `Failed to execute query: ${e.message}`};
    };
};

export default createWatercraft;