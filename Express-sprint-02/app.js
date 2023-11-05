// Imports ----------------------------------------------------------------
import Express from "express";
//import Cors from "cors"
import database from "./database.js";
import cors from "cors";  // this is to fix the issue with not being able to fecth from another domain. FINALLy !!!!!!!!!!!!!!


// Configure express app --------------------------------------------------
const app = new Express();
app.use(cors());

// Configure middleware ---------------------------------------------------

//Controllers -------------------------------------------------------------
const boatController = async (req, res) => {

    const status = req.params.status; // when is Undefined it will be /api/boats 

    // Build SQL
        // get all boats
    const table = 'boats';
    const extendedTable = `${table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
    LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
    LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID `;

    const extendedField = ['boats.Registration_Number, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL, watercrafttypes.Type, boats.Status'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
    if(status) {sql += `WHERE boats.Status = "${status}"`} // when status is set we use where clause
        //console.log(sql);
 
    // EXECUTE SQL
    let isSuccess = false;
    let message = "";
    let result = null;

    try {
        [result] = await database.query(sql);
        if(result.length === 0) {message = "No record(s) found"}
        else {
        isSuccess= true;
        message = "Record(s) found";
        };
    }
    catch(e) {
        message = `Failed to execute query: ${e.message}`;
    };
    // RESPONSES 
    isSuccess 
    ? res.status(200).json(result) // set status to 200 then return result as json
    : res.status(400).json({message});// something went wrong and set status to 400 and return message as json 
    console.log(res);
};

// model controller
const modelController = async (req,res) => {

    // Build SQL
        // get all model name
    const table = 'models';
    const extendedTable = `${table} LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID`;

    const extendedField = ['models.Model_Name, watercrafttypes.Type'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
    console.log(sql);
 
    // EXECUTE SQL
    let isSuccess = false;
    let message = "";
    let result = null;

    try {
        [result] = await database.query(sql);
        if(result.length === 0) {message = "No record(s) found"}
        else {
        isSuccess= true;
        message = "Record(s) found";
        };
    }
    catch(e) {
        message = `Failed to execute query: ${e.message}`;
    };

    // RESPONSES 
    isSuccess 
    ? res.status(200).json(result) // set status to 200 then return result as json
    : res.status(400).json({message});// something went wrong and set status to 400 and return message as json 
};



// Endpoints --------------------------------------------------------------
app.get('/api/boats', boatController); // for all boats
app.get('/api/boats/:status', boatController); // for boats with specific status
app.get('/api/model', modelController); // get model name

// Start server -----------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));