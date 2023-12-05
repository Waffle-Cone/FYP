import database from "../../database.js";
import buildWatercraftSelectSQL from "../Build_SQL/buildWatercraftSelectSQL.js";
import Query from "../Query.js";

const updateWatercraft = async (sql,id,record) => {
    try {

        const status = await database.query(sql,{...record, Synthetic_Key: id});

        const recoverRecordSql = buildWatercraftSelectSQL(id,'PUT')

        const {isSuccess, result, message} = await Query.read(recoverRecordSql);

        return isSuccess
        ? { isSuccess:true, result: result, message:"Record found"}
        : { isSuccess:false, result:null,message:`Failed to recover the updated record: ${message}`};

    }
    catch(e) {
       return{isSuccess:false, result: null, message: `Failed to execute query: ${e.message}`};
    };
};

export default updateWatercraft;