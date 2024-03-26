import { useState, useEffect, Button } from "react";
import API from "../../API/API";
import { useLocation, useNavigate } from "react-router-dom";
import isURL from "is-url";
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";
import FORM from "../../UI/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Icon from "../../UI/Icons";
import Conformance from "../../util/Conformance";
import SetInitial from "../../util/SetInitial";
import IsInputValid from "../../util/IsInputValid";
import FormInputErrorMessages from "../../util/FormInputErrorMessages";
import { employeeEndpoints } from "../../util/FormEndpoints";

const initialEmployee = {
  Employee_Name: null,
  Job_ID: 0,
  Start_Date: null,
  //Username: null,
  //Password: null,
  Employee_Img: null,
};

function EmployeeForm({ onSuccess }) {
  // Initialisation ------------------------------
  const navigate = useNavigate(); //used to navigate to diffent pages
  const { state } = useLocation();

  const [theEmployee, selectedEmployeeID, title, isModifyForm] = SetInitial.employee(initialEmployee, state);
  //State ---------------------------------------
  const [employee, setEmployee] = useState(theEmployee);
  const [jobList, setJobList, loadingJobsMessage, loadJobs] = useLoad(employeeEndpoints.jobsEndpoint);
  const [errors, setErrors] = useState(Object.keys(employee).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  //Handlers -------------------------------------

  const handleDate = (date) => {
    console.log(date);
    const datePicker = new Date(date);

    const year = datePicker.getFullYear();
    let month = datePicker.getMonth() + 1; // months start at 0
    let day = datePicker.getDate();

    //phpMyAdmin does not accept dates without leading zeros !!!!
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;

    const startDate = `${year}/${month}/${day}`;
    console.log(startDate);

    const conformedValue = Conformance.employee.html2js["Start_Date"](startDate);
    setEmployee({ ...employee, ["Start_Date"]: conformedValue });
    setErrors({ ...errors, ["Start_Date"]: IsInputValid.employee["Start_Date"](conformedValue) ? null : FormInputErrorMessages.employee["Start_Date"] });
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    console.log(name, value);
    const conformedValue = Conformance.employee.html2js[name](value);
    setEmployee({ ...employee, [name]: conformedValue });
    setErrors({ ...errors, [name]: IsInputValid.employee[name](conformedValue) ? null : FormInputErrorMessages.employee[name] });
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]); // I NEED THIS == without it all the error message are one step behind

  const handleCancel = () => {
    navigate("/staff");
  };

  const handleSubmit = async () => {
    const check = IsInputValid.isValid(employee, IsInputValid.employee, errors, FormInputErrorMessages.employee);
    setErrors({ ...errors });
    if (check) {
      //value checks
      if (employee.Employee_Img === null) employee.Employee_Img = "https://idea7.co.uk/wp-content/uploads/2021/02/placeholder-250x250-1.png"; // default placeholder image

      let result = null;

      if (isModifyForm) {
        result = await API.put(`${employeeEndpoints.putEmployeeEndpoint}/${selectedEmployeeID}`, employee);
      } else {
        result = await API.post(employeeEndpoints.postEmployeeEndpoint, employee);
      }

      console.log(result);
      if (result.isSuccess) {
        console.log("Insert success");
        navigate("/staff");
      } else {
        console.log(`Insert NOT Successful: ${result.message}`);
      }
    } else {
      console.log("errors found");
    }
  };

  //View -----------------------------------------
  return (
    <>
      <FORM.Container>
        <h1 id="title">{title}</h1>
        <FORM.Tray>
          <FORM.Input
            htmlFor="Employee_Name"
            text="First and Last Name"
            type="text"
            FieldName="Employee_Name"
            conformance={Conformance.employee.js2html["Employee_Name"](employee.Employee_Name)}
            onChange={handleChange}
            errors={errors.Employee_Name}
          />

          <FORM.Select
            htmlFor="Job_ID"
            text="Job"
            list={jobList}
            loadingMessage={loadingJobsMessage}
            name="Job_ID"
            conformance={Conformance.employee.js2html["Job_ID"](employee.Job_ID)}
            onChange={handleChange}
            listKey="Job_ID"
            listValue="Job_ID"
            listText="Job_Name"
            errors={errors.Job_ID}
          />

          <span>
            <label>Start Date</label>

            <span style={{ display: "flex" }}>
              <Icon.Calendar />
              <DatePicker selected={employee.Start_Date} onChange={(date) => handleDate(date)} className="datePicker" dateFormat="dd/MM/yyyy" />
            </span>
            <span style={{ color: "red" }}>{errors.Start_Date}</span>
          </span>

          <FORM.Input
            htmlFor="Employee_Img"
            text="Image URL"
            type="text"
            FieldName="Employee_Img"
            value={Conformance.employee.js2html["Employee_Img"](employee.Employee_Img)}
            onChange={handleChange}
            errors={errors.Employee_Img}
          />
        </FORM.Tray>

        <Action.Tray>
          <Action.Cancel buttonText="Cancel" showText={true} onClick={handleCancel}></Action.Cancel>
          <Action.Submit buttonText="Submit" showText={true} onClick={handleSubmit}></Action.Submit>
        </Action.Tray>
      </FORM.Container>
    </>
  );
}

export default EmployeeForm;
