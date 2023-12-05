import { validationResult } from "express-validator";
import responseSetting from "../helperFunctions/ResponseSetting.js";
import buildWatercraftDeleteSQL from "../Query/Build_SQL/Delete Statements/buildWatercraftDeleteSQL.js";
import deleteWatercraft from "../Query/Delete/deleteWatercraft.js";

const deleteBoatController = async (req, res) => {
    const errors = validationResult(req);


   if(!errors.isEmpty()){
        console.log(errors)
    }
    else{
    console.log(req.body); 
    const id = req.params.id;
    //access data
    const sql = buildWatercraftDeleteSQL();
    const {isSuccess, result, message: accessorMessage} = await deleteWatercraft(sql,id);
    const check = responseSetting(res,'DELETE',result,accessorMessage,isSuccess);
   
    }
};

export default deleteBoatController;