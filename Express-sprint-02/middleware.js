import Express from "express";
import cors from "cors"; // this is to fix the issue with not being able to fecth from another domain. FINALLy !!!!!!!!!!!!!

const appSetup = () => {
    const app = new Express(); 
    // Configure middleware ---------------------------------------------------
    app.use(cors());
    app.use(Express.urlencoded({extended: false})); //this specifies the incoming request object as a string
    app.use(Express.json()); //this specifies the incoming request object as a JSON string*/
    return app;
}

export default appSetup;