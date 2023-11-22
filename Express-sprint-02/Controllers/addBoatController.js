import { validationResult } from "express-validator";
import responseSetting from "../helperFunctions/ResponseSetting.js";
import buildWatercraftInsertSQL from "../Query/Build_SQL/Insert Statements/buildWatercraftInsertSQL.js";
import createWatercraft from "../Query/Create/createWatercraft.js";


const addBoatController = async (req, res) => {
    const errors = validationResult(req);

   if(!errors.isEmpty()){
        console.log(errors)
    }
    else{
    console.log(req.body);    
    //access data
    const sql = buildWatercraftInsertSQL(req.body);
    const {isSuccess, result, message: accessorMessage} = await createWatercraft(sql,req.body);
    const check = responseSetting(res,'POST',result,accessorMessage,isSuccess);
   
    }
};

export default addBoatController;