import { useState, useEffect, Button, useRef } from "react";
import API from "../../API/API";
import { useLocation, useNavigate } from "react-router-dom";
import isURL from "is-url";
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";
import FORM from "../../UI/Form";

const initialWatercraft = {
  Boat_Img: null,
  Registration: null,
  Model_ID: 0,
  Status_ID: 0,
};

const newEmployeeReservation = {
  Employee_ID: 0,
  EmployeeReservation_ID: 0,
  BoatReservation_ID: 0,
};

function AddCrewMemberToBookingForm() {
  // Initialisation ------------------------------

  const title = "Adding Crew Member";
  const navigate = useNavigate(); //used to navigate to diffent pages
  const { state } = useLocation();
  const bookingID = state.bookingNumber;

  const crew = state.crew;
  const alreadyCrewIDs = new Set();
  let crewPresent = true;

  if (crew.length > 0) {
    crew.map((member) => {
      alreadyCrewIDs.add(member.Employee_ID);
    });
  } else {
    crewPresent = false;
    console.log("No crew");
  }

  const conformance = {
    html2js: {
      Employee_ID: (value) => (value == 0 ? null : parseInt(value)),
      BoatReservation_ID: (value) => (value == 0 ? null : parseInt(value)),
      EmployeeReservation_ID: (value) => (value == 0 ? null : parseInt(value)),
    },

    js2html: {
      Employee_ID: (value) => (value === null ? 0 : value),
      BoatReservation_ID: (value) => (value === null ? 0 : value),
      EmployeeReservation_ID: (value) => (value === null ? 0 : value),
    },
  };

  const isValid = {
    Employee_ID: (value) => value != 0 || value != "0",
    BoatReservation_ID: (value) => value != 0 || value != "0",
    EmployeeReservation_ID: (value) => value != 0 || value != "0",
  };

  const errorMessage = {
    Employee_ID: "No Employee Selected",
    BoatReservation_ID: "No Boat Selected",
    EmployeeReservation_ID: "Not set",
  };

  const boatreservationEndpoint = `/boatsreservations/booking/${bookingID}`;
  const postNewCrewMemberEndpoint = "/employeereservations";
  const allEmployeesEnpoint = `/employees`;

  //State ---------------------------------------
  const [newMember, setNewMember] = useState(newEmployeeReservation);
  const [boatreservations, setBoatreservations, loadingBoatMessage, loadBoatReservations] = useLoad(boatreservationEndpoint);
  const [employees, setEmployees, loadingEmployeesMessage, loadEmployees] = useLoad(allEmployeesEnpoint);
  const [employeeSelections, setEmployeeSelections] = useState([]);
  const [errors, setErrors] = useState(Object.keys(newEmployeeReservation).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  useEffect(() => {
    let updatedEmployees = [];
    if (crewPresent && employees) {
      employees.forEach((employee) => {
        let returnIt = true;
        alreadyCrewIDs.forEach((crewID) => {
          if (crewID === employee.Employee_ID) {
            returnIt = false;
          }
        });
        if (returnIt) {
          updatedEmployees.push(employee);
        }
      });
      setEmployeeSelections(updatedEmployees);
    } else {
      setEmployeeSelections(employees);
    }
  }, [employees]);

  //Handlers -------------------------------------
  const handleCancel = () => {
    navigate(-1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const conformedValue = conformance.html2js[name](value);
    console.log(conformedValue);
    setNewMember({ ...newMember, [name]: conformedValue });
    setErrors({ ...errors, [name]: isValid[name](conformedValue) ? null : errorMessage[name] });
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]); // I NEED THIS == without it all the error message are one step behind

  useEffect(() => {
    setNewMember(newMember);
  }, [newMember]); // I NEED THIS == without it all the error message are one step behind

  const isValidMemberValid = (crewMember) => {
    let isValidMemberValid = true;
    Object.keys(newMember).forEach((key) => {
      // we do this becasue setErrors is asychronous thus we cannot determine its stte when we need to go through it
      if (isValid[key](newMember[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isValidMemberValid = false;
      }
    });
    return isValidMemberValid;
  };

  const getEmployeeReservationNumber = () => {
    const selectedBoatReservationID = newMember.BoatReservation_ID;
    const employeeReservationNumber = crew.find((member) => member.BoatReservation_ID === selectedBoatReservationID).EmployeeReservation_ID;
    console.log(employeeReservationNumber);
    return employeeReservationNumber;
  };

  const handleSubmit = async () => {
    if (crewPresent) {
      const selectedEmployeeReservationID = getEmployeeReservationNumber();
      setNewMember({ ...newMember, ["EmployeeReservation_ID"]: selectedEmployeeReservationID });
      newMember.EmployeeReservation_ID = selectedEmployeeReservationID;
    } else {
      const randomNumber = Math.floor(Math.random() * 10000) + 1;
      setNewMember({ ...newMember, ["EmployeeReservation_ID"]: randomNumber });
    }

    const check = isValidMemberValid(newMember);
    setErrors({ ...errors });
    console.log(errors);
    if (check) {
      let result = null;
      console.log(newMember);
      result = await API.post(postNewCrewMemberEndpoint, newMember);

      console.log(result);
      if (result.isSuccess) {
        console.log("Insert success");
        navigate(-1);
      } else {
        console.log(`Insert NOT Successful: ${result.message}`);
      }
    }
  };

  //View -----------------------------------------
  return (
    <>
      <FORM.Container>
        <h1 id="title">{title}</h1>
        <FORM.Tray>
          <FORM.Select
            htmlFor="Employee_ID"
            text="Select new Crew Memeber"
            list={employeeSelections}
            loadingMessage={loadingEmployeesMessage}
            name="Employee_ID"
            conformance={conformance.js2html["Employee_ID"](newMember.Employee_ID)}
            onChange={handleChange}
            listKey="Employee_ID"
            listValue="Employee_ID"
            listText="Employee_Name"
            errors={errors.Employee_ID}
          />
          <FORM.Select
            htmlFor="BoatReservation_ID"
            text="Select Boat to Join"
            list={boatreservations}
            loadingMessage={loadingBoatMessage}
            name="BoatReservation_ID"
            conformance={conformance.js2html["BoatReservation_ID"](newMember.BoatReservation_ID)}
            onChange={handleChange}
            listKey="Boatreservation_ID"
            listValue="Boatreservation_ID"
            listText="Model_Name"
            errors={errors.BoatReservation_ID}
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

export default AddCrewMemberToBookingForm;
