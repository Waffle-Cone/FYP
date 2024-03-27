import { useState, useEffect, Button, useRef } from "react";
import API from "../../API/API";
import { useLocation, useNavigate } from "react-router-dom";
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";
import FORM from "../../UI/Form";
import SetInitial from "../../util/SetInitial";
import Conformance from "../../util/Conformance";
import IsInputValid from "../../util/IsInputValid";
import FormInputErrorMessages from "../../util/FormInputErrorMessages";
import { addCrewMemberEndpoints } from "../../util/FormEndpoints";

const newEmployeeReservation = {
  Employee_ID: 0,
  EmployeeReservation_ID: 0,
  BoatReservation_ID: 0,
};

function AddCrewMemberToBookingForm() {
  // Initialisation ------------------------------

  const navigate = useNavigate(); //used to navigate to diffent pages
  const { state } = useLocation();

  const [title, bookingID, crewPresent, crew, alreadyCrewIDs] = SetInitial.addCrewMember(newEmployeeReservation, state);

  //State ---------------------------------------
  const [newMember, setNewMember] = useState(newEmployeeReservation);
  const [boatreservations, setBoatreservations, loadingBoatMessage, loadBoatReservations] = useLoad(addCrewMemberEndpoints.getBoatReservations(bookingID));
  const [employees, setEmployees, loadingEmployeesMessage, loadEmployees] = useLoad(addCrewMemberEndpoints.allEmployeesEnpoint);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    const conformedValue = Conformance.addCrewMember.html2js[name](value);
    console.log(conformedValue);
    setNewMember({ ...newMember, [name]: conformedValue });
    setErrors({ ...errors, [name]: IsInputValid.addCrewMember[name](conformedValue) ? null : FormInputErrorMessages.addCrewMember[name] });
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]); // I NEED THIS == without it all the error message are one step behind

  useEffect(() => {
    setNewMember(newMember);
  }, [newMember]); // I NEED THIS == without it all the error message are one step behind

  const getEmployeeReservationNumber = () => {
    const selectedBoatReservationID = newMember.BoatReservation_ID;
    console.log(selectedBoatReservationID);
    const employeeReservationNumber = crew.find((member) => member.BoatReservation_ID === selectedBoatReservationID).EmployeeReservation_ID;
    console.log(employeeReservationNumber);
    return employeeReservationNumber;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (newMember.Employee_ID === 0 || newMember.BoatReservation_ID === 0) {
      if (newMember.Employee_ID === 0) {
        errors["Employee_ID"] = FormInputErrorMessages.addCrewMember["Employee_ID"];
      } else {
        errors["Employee_ID"] = null;
      }
      if (newMember.BoatReservation_ID === 0) {
        errors["BoatReservation_ID"] = FormInputErrorMessages.addCrewMember["BoatReservation_ID"];
      } else {
        errors["BoatReservation_ID"] = null;
      }
    } else {
      if (crewPresent) {
        const selectedEmployeeReservationID = getEmployeeReservationNumber();
        setNewMember({ ...newMember, ["EmployeeReservation_ID"]: selectedEmployeeReservationID });
        newMember.EmployeeReservation_ID = selectedEmployeeReservationID;
      } else {
        const randomNumber = Math.floor(Math.random() * 10000) + 1;
        setNewMember({ ...newMember, ["EmployeeReservation_ID"]: randomNumber });
      }
    }

    const check = IsInputValid.isValid(newMember, IsInputValid.addCrewMember, errors, FormInputErrorMessages.addCrewMember);
    setErrors({ ...errors });
    console.log(errors);
    if (check) {
      let result = null;
      console.log(newMember);
      result = await API.post(addCrewMemberEndpoints.postNewCrewMemberEndpoint, newMember);

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
            conformance={Conformance.addCrewMember.js2html["Employee_ID"](newMember.Employee_ID)}
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
            conformance={Conformance.addCrewMember.js2html["BoatReservation_ID"](newMember.BoatReservation_ID)}
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
