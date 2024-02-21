import { check } from "express-validator";
/**
 * Contains all the validations used for each form
 */
const FormValidator = {};
FormValidator.validateAddBoatForm = () => validateAddBoatForm();
FormValidator.validateAddEmployeeForm = () => validateAddEmployeeForm();

const validateAddBoatForm = () => {
  return [
    check("Boat_Img").isURL().optional({ nullable: true }), // is a url or is null
    check("Registration").isString(),
    check("Model_ID").isInt(), //not the name because i need the model number in the databse
    check("Status_ID").isInt(),
  ];
};

const validateAddEmployeeForm = () => {
  return [
    check("Employee_Img").isURL().optional({ nullable: true }),
    check("Employee_Name").isString(),
    check("Job_ID").isInt(),
    check("Start_Date").isDate(),
    //check('Username').isByteLength(10),
    //check('Username').isByteLength(10),
  ];
};

export default FormValidator;
//joi validator check
