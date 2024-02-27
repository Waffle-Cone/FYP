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

  //One form for both add and modify
  let isModifyForm = false;
  let selectedEmployeeID = null;
  let title = "Add Employee";

  if (state) {
    isModifyForm = true;
    selectedEmployeeID = state.initialEmployee.Employee_ID;
    title = "Modify Employee";
    console.log(selectedEmployeeID);

    //set up the initialEmployee object
    initialEmployee.Employee_Name = state.initialEmployee.Employee_Name;
    initialEmployee.Job_ID = state.initialEmployee.Job_ID;
    initialEmployee.Start_Date = state.initialEmployee.Start_Date;
    initialEmployee.Employee_Img = state.initialEmployee.Employee_Img;
  } else {
    initialEmployee.Employee_Name = null;
    initialEmployee.Job_ID = 0;
    initialEmployee.Start_Date = null;
    initialEmployee.Employee_Img = null;
  }

  const conformance = {
    html2js: {
      Employee_Name: (value) => (value === "" ? null : value),
      Job_ID: (value) => (value == 0 ? null : parseInt(value)),
      Start_Date: (value) => (value === "" ? null : value),
      Employee_Img: (value) => (value === "" ? null : value),
    },

    js2html: {
      Employee_Name: (value) => (value === null ? "" : value),
      Job_ID: (value) => (value === null ? 0 : value),
      Start_Date: (value) => (value === null ? "" : value),
      Employee_Img: (value) => (value === null ? "" : value),
    },
  };

  const isValid = {
    Employee_Name: (value) => value !== null && value !== undefined,
    Job_ID: (value) => value != 0 || (value != "0" && value != null),
    Start_Date: (value) => value !== null && value !== undefined,
    Employee_Img: (value) => (value === null ? true : isURL(value)),
  };

  const errorMessage = {
    Employee_Name: "Enter Name",
    Job_ID: "No job selected",
    Start_Date: "No start date selected",
    Employee_Img: "Invalid URL",
  };

  const jobsEndpoint = "/jobs";
  const postEmployeeEndpoint = "/employees";
  const putEmployeeEndpoint = "/employees";

  //State ---------------------------------------
  const [employee, setEmployee] = useState(initialEmployee);
  const [jobList, setJobList, loadingJobsMessage, loadJobs] = useLoad(jobsEndpoint);
  const [errors, setErrors] = useState(Object.keys(initialEmployee).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  console.log(employee);
  //Handlers -------------------------------------
  const handleCancel = () => {
    navigate("/staff");
  };

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

    const conformedValue = conformance.html2js["Start_Date"](startDate);
    setEmployee({ ...employee, ["Start_Date"]: conformedValue });
    setErrors({ ...errors, ["Start_Date"]: isValid["Start_Date"](conformedValue) ? null : errorMessage["Start_Date"] });
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;
    console.log(name, value);
    const conformedValue = conformance.html2js[name](value);
    setEmployee({ ...employee, [name]: conformedValue });
    setErrors({ ...errors, [name]: isValid[name](conformedValue) ? null : errorMessage[name] });
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]); // I NEED THIS == without it all the error message are one step behind

  const isVallidEmployee = (employee) => {
    let isEmployeeValid = true;
    Object.keys(employee).forEach((key) => {
      console.log(`${employee[key]} ${isValid[key](employee[key])}`);
      // we do this becasue setErrors is asychronous thus we cannot determine its stte when we need to go through it
      if (isValid[key](employee[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isEmployeeValid = false;
      }
    });
    return isEmployeeValid;
  };

  const handleSubmit = async () => {
    const check = isVallidEmployee(employee);
    setErrors({ ...errors });
    if (check) {
      //value checks
      if (employee.Employee_Img === null) employee.Employee_Img = "https://idea7.co.uk/wp-content/uploads/2021/02/placeholder-250x250-1.png"; // default placeholder image

      let result = null;

      if (isModifyForm) {
        result = await API.put(`${putEmployeeEndpoint}/${selectedEmployeeID}`, employee);
      } else {
        result = await API.post(postEmployeeEndpoint, employee);
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
            conformance={conformance.js2html["Employee_Name"](employee.Employee_Name)}
            onChange={handleChange}
            errors={errors.Employee_Name}
          />

          <FORM.Select
            htmlFor="Job_ID"
            text="Job"
            list={jobList}
            loadingMessage={loadingJobsMessage}
            name="Job_ID"
            conformance={conformance.js2html["Job_ID"](employee.Job_ID)}
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
            value={conformance.js2html["Employee_Img"](employee.Employee_Img)}
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
