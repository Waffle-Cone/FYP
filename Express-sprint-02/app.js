// Imports ----------------------------------------------------------------
import Express from "express";
//import Cors from "cors"
import database from "./database.js";
import { check, validationResult } from "express-validator";
import cors from "cors";  // this is to fix the issue with not being able to fecth from another domain. FINALLy !!!!!!!!!!!!!!



// Configure express app --------------------------------------------------
const app = new Express(); 

// Configure middleware ---------------------------------------------------
app.use(cors());
app.use(Express.urlencoded({extended: false})); //this specifies the incoming request object as a string
app.use(Express.json()); //this specifies the incoming request object as a JSON string

// GET Controllers -------------------------------------------------------------
const boatController = async (req, res) => {

    const status = req.params.status; // when is Undefined it will be /api/boats 

    // Build SQL
        // get all boats
    const table = 'boats';
    const extendedTable = `${table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
    LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
    LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID `;

    const extendedField = ['boats.Registration, boats.Boat_Img, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL, watercrafttypes.Type, boats.Status'];

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
    //console.log(res);
    console.log("Fetched watercraft");
};

// model controller
const modelController = async (req,res) => {

    // Build SQL
        // get all model name
    const table = 'models';
    const extendedTable = `${table}`;

    const extendedField = ['models.Model_ID,models.Model_Name'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
    console.log("Fetched models");
 
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
//post sql
const buildWatercraftInsertSQL = (record) => {
    const table = 'Boats'
    const mutableFields = ['Boat_Img','Registration','Model_ID','Status']
    return `INSERT INTO  ${table} SET
            Boat_Img=:Boat_Img,
            Registration=:Registration,
            Model_ID=:Model_ID,
            Status=:Status`;

};

const buildWatercraftSelectSQL = (id) => {
    const table = 'Boats'
    let sql = `SELECT * FROM ${table}
            WHERE Registration= ${id}`;
    return sql;
};
// CREATE, READ
const createWatercraft = async (sql,record) => {
    try {

        const status = await database.query(sql,record);

        const recoverRecordSql = buildWatercraftSelectSQL(status[0].insertId)

        const {isSuccess, result, message} = await read(recoverRecordSql);

        return isSuccess
        ? { isSuccess:true, result: result, message:"Record found"}
        : { isSuccess:false, result:null,message:`Failed to recover the inserted record: ${message}`};

    }
    catch(e) {
       return{isSuccess:false, result: null, message: `Failed to execute query: ${e.message}`};
    };
};

const read = async (sql) => {
    let isSuccess = false;
    let message = "";
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


//POST Controllers

const addBoatController = async (req, res) => {
    const errors = validationResult(req);

   if(!errors.isEmpty()){
        console.log(errors)
    }
    else{
    console.log(req.body);
    //const {Img_URL,Registration_Number,Model_ID,Status}= req.body; // get the values i need insert from the body 
    //console.log(`Image: ${Img_URL}, Registration: ${Registration_Number}, Model_ID: ${Model_ID}, Status: ${Status}`);
    
    //access data
    const sql = buildWatercraftInsertSQL(req.body);
    const {isSuccess, result, message: accessorMessage} = await createWatercraft(sql,req.body);
    !isSuccess
    ?res.status(404).json({message: accessorMessage})
    :res.status(201).json(result) //the request has succeeded and has led to the creation of a resource <------- THIS CODE COSTED ME HOURSE OF Debugging
    }
};



// Endpoints --------------------------------------------------------------
app.get('/api/boats', boatController); // for all boats
app.get('/api/boats/:status', boatController); // for boats with specific status
app.get('/api/model', modelController); // get model name

app.post('/api/boats', [check('Boat_Img').isURL().optional({nullable: true}), // is a url or is null
                        check('Registration').isString(),
                        check('Model_ID').isInt(), //not the name because i need the model number in the databse
                        check('Status').isIn(['Available','Out of Water','Maintenance','Booked'])
                        ],addBoatController);

// Start server -----------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));