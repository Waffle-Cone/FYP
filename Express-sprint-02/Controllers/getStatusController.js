import responseSetting from "../helperFunctions/ResponseSetting.js";
import Query from "../Query/Query.js";

const getStatusController = async (req,res)=>{
    const table ='boatstatus';
    const fields = ['Status_ID,Status'];
    let sql = `SELECT ${fields} from ${table}`;
    console.log("Feteched status");
    const {isSuccess, result, message} = await Query.read(sql);
    responseSetting(res,'GET',result,message,isSuccess); 
};

export default getStatusController;