import database from "../database.js";
const Query = {};

Query.read = (sql) => read(sql);

const read = async (sql) => {
    let result = null;

    try {
        [result] = await database.query(sql);
        return(result.length === 0) 
       ? { isSuccess:false, result:null,message:"No record(s) found"}
        :{ isSuccess:true, result: result, message:"Record(s) found"};
    }
    catch(e) {
       return{isSuccess:false, result: null, message: `Failed to execute query: ${e.message}`};
    };

};

export default Query;