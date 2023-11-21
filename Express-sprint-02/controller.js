import { check, validationResult } from "express-validator";

const CONTROLLER = {

    getBoatController: async (req, res) => {
    
        const status = req.params.status; // when is Undefined it will be /api/boats 
    
        const table = 'boats';
        const extendedTable = `${table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
        LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
        LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID 
        LEFT JOIN boatstatus ON boats.Status_ID = boatstatus.Status_ID`;
    
        const extendedField = ['boats.Registration, boats.Boat_Img, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL, watercrafttypes.Type, boatstatus.Status'];
    
        let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
        if(status) {sql += `WHERE boats.Status = "${status}"`} // when status is set we use where clause
     
        // EXECUTE SQL
        const {isSuccess, result, message} = await read(sql);
        // RESPONSES 
        responseSetting(res,'GET',result,message,isSuccess); // sets up the res.json for me
    }

};


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
    
    
    // GET Controllers -------------------------------------------------------------
    /*const getBoatController = async (req, res) => {
    
        const status = req.params.status; // when is Undefined it will be /api/boats 
    
        const table = 'boats';
        const extendedTable = `${table} LEFT JOIN models ON boats.Model_ID = models.Model_ID
        LEFT JOIN manufacturers ON models.Manufacturer_ID = manufacturers.Manufacturer_ID
        LEFT JOIN watercrafttypes ON models.Type_ID = watercrafttypes.Type_ID 
        LEFT JOIN boatstatus ON boats.Status_ID = boatstatus.Status_ID`;
    
        const extendedField = ['boats.Registration, boats.Boat_Img, models.Model_Name, manufacturers.Manufacturer_Name, models.Img_URL, watercrafttypes.Type, boatstatus.Status'];
    
        let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
        if(status) {sql += `WHERE boats.Status = "${status}"`} // when status is set we use where clause
     
        // EXECUTE SQL
        const {isSuccess, result, message} = await read(sql);
        // RESPONSES 
        responseSetting(res,'GET',result,message,isSuccess); // sets up the res.json for me
    };*/
    
    // model controller
    const getModelController = async (req,res) => {
    
        // Build SQL
        const table = 'models';
        const extendedTable = `${table}`;
    
        const extendedField = ['models.Model_ID,models.Model_Name'];
    
        let sql = `SELECT ${extendedField} FROM ${extendedTable}`;
        console.log("Fetched models");
        // EXECUTE SQL
        const {isSuccess, result, message} = await read(sql);
        // RESPONSES 
        responseSetting(res,'GET',result,message,isSuccess);
    };
    
    const getStatusController = async (req,res)=>{
        const table ='boatstatus';
        const fields = ['Status_ID,Status'];
        let sql = `SELECT ${fields} from ${table}`;
        console.log("Feteched status");
        const {isSuccess, result, message} = await read(sql);
        responseSetting(res,'GET',result,message,isSuccess); 
    };
    
    //POST Controllers
    
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
        responseSetting(res,'POST',result,accessorMessage,isSuccess);
     
    }
    };
    



export default CONTROLLER;
