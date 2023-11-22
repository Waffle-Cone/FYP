// Imports ----------------------------------------------------------------
import Express from "express";
//import Cors from "cors"
import database from "./database.js";
import { check, validationResult } from "express-validator";
import cors from "cors";  // this is to fix the issue with not being able to fecth from another domain. FINALLy !!!!!!!!!!!!!!
import getBoatController from "./Controllers/getBoatController.js";
import getModelController from "./Controllers/getModelController.js";
import getStatusController from "./Controllers/getStatusController.js";
import addBoatController from "./Controllers/addBoatController.js";



// Configure express app --------------------------------------------------
const app = new Express(); 

// Configure middleware ---------------------------------------------------
app.use(cors());
app.use(Express.urlencoded({extended: false})); //this specifies the incoming request object as a string
app.use(Express.json()); //this specifies the incoming request object as a JSON string

// functions to help
const read = async (sql) => {
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

const responseSetting = (res,method,result,message,isSuccess) => {
    if(method === 'GET')
    {
        isSuccess 
        ? res.status(200).json(result) // set status to 200 then return result as json
        : res.status(400).json({message});// something went wrong and set status to 400 and return message as json
        //console.log(res.status(200));
        
    }
    else if(method === 'POST') 
    {
        !isSuccess
        ?res.status(404).json({message})
        :res.status(201).json(result)
    }
};

const buildWatercraftSelectSQL = (id) => {
    const table = 'Boats'
    let sql = `SELECT * FROM ${table}
            WHERE Registration= ${id}`;
    return sql;
};

const buildWatercraftSelectSQL2 = (id,varient) => {
    let sql= ''

    const table = ''
    const extendedTable = `${table}`
    const fileds =['']
    const extendedFields = [''];

};

//post sql
const buildWatercraftInsertSQL = (record) => {
    const table = 'Boats'
    const mutableFields = ['Boat_Img','Registration','Model_ID','Status_ID']
    return `INSERT INTO  ${table} SET
            Boat_Img=:Boat_Img,
            Registration=:Registration,
            Model_ID=:Model_ID,
            Status_ID=:Status_ID`;

};

// CREATE, READ
const createWatercraft = async (sql,record,selectionFunction) => {
    try {

        const status = await database.query(sql,record);

        const recoverRecordSql = selectionFunction(status[0].insertId)

        const {isSuccess, result, message} = await read(recoverRecordSql);

        return isSuccess
        ? { isSuccess:true, result: result, message:"Record found"}
        : { isSuccess:false, result:null,message:`Failed to recover the inserted record: ${message}`};

    }
    catch(e) {
       return{isSuccess:false, result: null, message: `Failed to execute query: ${e.message}`};
    };
};

//POST Controllers

/*const addBoatController = async (req, res) => {
    const errors = validationResult(req);

   if(!errors.isEmpty()){
        console.log(errors)
    }
    else{
    console.log(req.body);    
    //access data
    const sql = buildWatercraftInsertSQL(req.body);
    const {isSuccess, result, message: accessorMessage} = await createWatercraft(sql,req.body,buildWatercraftSelectSQL);
    const check = responseSetting(res,'POST',result,accessorMessage,isSuccess);
   
    }
};*/



// Endpoints --------------------------------------------------------------
app.get('/api/boats',(req,res)=> getBoatController(req,res)); // for all boats
//app.get('/api/boats/status/:id', (req,res)=> getBoatController(req,res,"status")); // for boats with specific status
//app.get('/api/boats/:id', (req,res)=> getBoatController(req,res,"primary")); // for a specific boat
app.get('/api/model', (req,res)=>getModelController(req,res)); // get model name
app.get('/api/status', (req,res)=>getStatusController(req,res)); //

app.post('/api/boats', [check('Boat_Img').isURL().optional({nullable: true}), // is a url or is null
                        check('Registration').isString(),
                        check('Model_ID').isInt(), //not the name because i need the model number in the databse
                        check('Status_ID').isInt()
                        ],(req,res)=>addBoatController(req,res)); //

// Start server -----------------------------------------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));