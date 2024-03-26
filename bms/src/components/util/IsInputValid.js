import isURL from "is-url";

const IsInputValid = {};

const watercraft = {
  Boat_Img: (value) => (value === null ? true : isURL(value)),
  Registration: (value) => {
    if (value !== null) {
      return value.length > 0 && value.length < 100;
    } else {
      return false;
    }
  },
  Model_ID: (value) => value != 0 || value != "0",
  Status_ID: (value) => value != 0 || value != "0",
};

const employee = {
  Employee_Name: (value) => value !== null && value !== undefined,
  Job_ID: (value) => value != 0 || (value != "0" && value != null),
  Start_Date: (value) => value !== null && value !== undefined,
  Employee_Img: (value) => (value === null ? true : isURL(value)),
};

const isValid = (objectToCheck, inputValid, errors, messages) => {
  let isValid = true;
  Object.keys(objectToCheck).forEach((key) => {
    // we do this becasue setErrors is asychronous thus we cannot determine its stte when we need to go through it
    if (inputValid[key](objectToCheck[key])) {
      errors[key] = null;
    } else {
      errors[key] = messages[key];
      isValid = false;
    }
  });
  return isValid;
};

IsInputValid.watercraft = watercraft;
IsInputValid.employee = employee;
IsInputValid.isValid = (objectToCheck, inputValid, errors, messages) => isValid(objectToCheck, inputValid, errors, messages);

export default IsInputValid;
