import responseSetting from "../helperFunctions/ResponseSetting.js";
import Query from "../Query/Query.js";

const getItemReservationController = async (req, res) => {

    const id = req.params.id;

    const table = 'boats';
    const extendedTable = `${table} LEFT JOIN boatreservation ON boats.Registration = boatreservation.Registration
    LEFT JOIN itemreservation ON boatreservation.BoatReservation_ID = itemreservation.BoatReservation_ID
    LEFT JOIN item ON itemreservation.Item_ID = item.Item_ID
    LEFT JOIN itemstatus ON item.Item_Status_ID = itemstatus.Item_Status_ID`;

    var extendedField = [' item.Item_Name,itemstatus.Item_Status'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable} WHERE boats.Synthetic_key = ${id}`
 
    // EXECUTE SQL
    const {isSuccess, result, message} = await Query.read(sql);
    // RESPONSES 
    responseSetting(res,'GET',result,message,isSuccess); // sets up the res.json for me
    

};

export default getItemReservationController;