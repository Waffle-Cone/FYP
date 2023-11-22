import responseSetting from "../helperFunctions/ResponseSetting.js";
import Query from "../Query/Query.js";

const getModelController = async (req,res) => {

    // Build SQL
    const table = 'models';
    const extendedTable = `${table}`;

    const extendedField = ['models.Model_ID,models.Model_Name'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
    console.log("Fetched models");
    // EXECUTE SQL
    const {isSuccess, result, message} = await Query.read(sql);
    // RESPONSES 
    responseSetting(res,'GET',result,message,isSuccess);
};

export default getModelController;