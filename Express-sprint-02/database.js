// Imports ----------------------------------------------------------------
import mysql from 'mysql2/promise';

// Database Connection ----------------------------------------------------
const dbConfig = {
    database: process.env.DB_NAME || 'fyp',
    port: process.env.DB_PORT || 3306,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password:process.env.DB_PSWG ||'',
    namedPlaceholders: true
};

let database = null;
try{
     database = await mysql.createConnection(dbConfig);
}
catch(e){
    console.log(`Error creating databse connection (Check XAMPP): ${e.message}`);
    process.exit();
};


export default database;
