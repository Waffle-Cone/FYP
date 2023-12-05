import responseSetting from "../helperFunctions/ResponseSetting.js";
import Query from "../Query/Query.js";

const getBoatController = async (req, res) => {

    const status = req.params.status; // when is Undefined it will be /api/boats 

    const table = 'boats';
    const extendedTable = `${table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
    LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
    LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID 
    LEFT JOIN boatstatus ON boats.Status_ID = boatstatus.Status_ID`;

    const extendedField = ['boats.Synthetic_Key','boats.Registration, boats.Boat_Img, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL, watercrafttypes.Type, boatstatus.Status'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
    if(status) {sql += `WHERE boats.Status = "${status}"`} // when status is set we use where clause
 
    // EXECUTE SQL
    const {isSuccess, result, message} = await Query.read(sql);
    // RESPONSES 
    responseSetting(res,'GET',result,message,isSuccess); // sets up the res.json for me
    

};

export default getBoatController;