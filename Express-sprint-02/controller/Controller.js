import responseSetting from "../helperFunctions/ResponseSetting.js";
import { validationResult } from "express-validator";

class Controller {
  constructor(accessor) {
    this.accessor = accessor;
  }

  //methods----------------------------------------------------------------
  get = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    // EXECUTE SQL
    const { isSuccess, result, message } = await this.accessor.read(id, status);

    // RESPONSES
    responseSetting(res, "GET", result, message, isSuccess); // sets up the res.json for me
  };

  post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
    } else {
      console.log(req.body);

      //access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.create(req.body);
      responseSetting(res, "POST", result, accessorMessage, isSuccess);
    }
  };

  put = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
    } else {
      console.log(req.body);
      const id = req.params.id;
      const record = req.body;

      //access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.update(id, record);
      responseSetting(res, "PUT", result, accessorMessage, isSuccess);
    }
  };

  delete = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
    } else {
      console.log(req.body);
      const id = req.params.id;
      //access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.delete(id);
      responseSetting(res, "DELETE", result, accessorMessage, isSuccess);
    }
  };
}
export default Controller;
