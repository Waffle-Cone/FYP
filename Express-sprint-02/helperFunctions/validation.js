import { check } from "express-validator";
/**
 * Contains all the validations used for each form
 */
const FormValidator = {};
 FormValidator.validateAddBoatForm = () => validateAddBoatForm();

const validateAddBoatForm = ()=> {
    return[
    check('Boat_Img').isURL().optional({nullable: true}), // is a url or is null
    check('Registration').isString(),
    check('Model_ID').isInt(), //not the name because i need the model number in the databse
    check('Status_ID').isInt()]
};

export default FormValidator;
