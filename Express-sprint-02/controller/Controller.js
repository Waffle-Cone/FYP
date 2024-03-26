import responseSetting from "../helperFunctions/ResponseSetting.js";
import { validationResult } from "express-validator";

class Controller {
  constructor(accessor) {
    this.accessor = accessor;
  }

  //methods----------------------------------------------------------------
  get = async (req, res) => {
    // EXECUTE SQL
    const { isSuccess, result, message } = await this.accessor.read(req);

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
      const { isSuccess, result, message: accessorMessage } = await this.accessor.create(req);
      responseSetting(res, "POST", result, accessorMessage, isSuccess);
    }
  };

  put = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
    } else {
      console.log(req.body);
      //access data
      const { isSuccess, result, message: accessorMessage } = await this.accessor.update(req);
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
