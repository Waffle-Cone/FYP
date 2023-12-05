import database from "../../database.js";

const deleteWatercraft = async (sql,id) => {
    try {
        const status = await database.query(sql,{Synthetic_Key: id});
        
        return status[0].affectedRows === 0
            ?{ isSuccess:false, result: null,message:`Failed to delete record ${id}`}
            :{ isSuccess:true, result: null, message:"Record deleted successfully"}
        
    }
    catch(e) {
       return{isSuccess:false, result: null, message: `Failed to execute query: ${e.message}`};
    };
};

export default deleteWatercraft;