import { useState, useEffect, Button } from "react";
import API from "../../API/API";
import { useNavigate } from "react-router-dom";
import isURL from "is-url";
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";
import FORM from "../../UI/Form";

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

  //State ---------------------------------------
  const [employee, setEmployee] = useState(initialEmployee);
  const [jobList, setJobList, loadingJobsMessage, loadJobs] = useLoad(jobsEndpoint);
  const [errors, setErrors] = useState(Object.keys(initialEmployee).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  //Handlers -------------------------------------
  const handleCancel = () => {
    navigate("/staff");
  };

  const handleChange = (event) => {
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
      /*
      const result = await API.post(postEmployeeEndpoint, employee);
      console.log(result);
      if (result.isSuccess) {
        alert("Insert success");
        navigate("/staff");
      } else {
        alert(`Insert NOT Successful: ${result.message}`);
      }*/
      console.log("new employee added");
    }
  };

  //View -----------------------------------------
  return (
    <>
      <h1 id="title">Add Employee</h1>
      <FORM.Container>
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
