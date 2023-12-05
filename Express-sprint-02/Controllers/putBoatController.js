import { validationResult } from "express-validator";
import responseSetting from "../helperFunctions/ResponseSetting.js";
import buildWatercraftUpdateSQL from "../Query/Build_SQL/Update Statments/buildWatercraftUpdateSQL.js";
import updateWatercraft from "../Query/Update/updateWatercraft.js";

const putBoatController = async (req, res) => {
    const errors = validationResult(req);


   if(!errors.isEmpty()){
        console.log(errors)
    }
    else{
    console.log(req.body); 
    const id = req.params.id;
    const record = req.body;
    


    //access data
    const sql = buildWatercraftUpdateSQL();
    const {isSuccess, result, message: accessorMessage} = await updateWatercraft(sql,id,record);
    const check = responseSetting(res,'PUT',result,accessorMessage,isSuccess);
   
    }
};

export default putBoatController;