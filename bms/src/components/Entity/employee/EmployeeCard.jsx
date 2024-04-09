import PropTypes from "prop-types";
import { Card } from "../../UI/Card";
import "./EmployeeCard.scss";
import { useNavigate } from "react-router-dom";

function EmployeeCard({ employee, openModal, editMode }) {
  // Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  // State ---------------------------------------------------------------
  //Handlers
  const handleEdit = () => {
    navigate("/editEmployee", { state: { initialEmployee: employee } });
  };
  const handleSelect = () => {
    //navigate("/profile", { state: { selectedEmployee: employee } });
    alert("Profile View not available yet");
  };

  // View ----------------------------------------------------------------
  return (
    <div className="employee">
      <Card selected={employee} openModal={openModal} editMode={editMode} handleEdit={handleEdit} handleSelect={handleSelect}>
        <img src={employee.Employee_Img} />
        <p>{employee.Employee_ID}</p>
        <p>{employee.Employee_Name}</p>
        <p>{employee.Job_Name}</p>
        <p>{employee.Employee_Status}</p>
      </Card>
    </div>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    Employee_Img: PropTypes.string,
    Employee_ID: PropTypes.number.isRequired,
    Employee_Name: PropTypes.string.isRequired,
    Job_Name: PropTypes.string.isRequired,
    Employee_Status: PropTypes.string.isRequired,
  }),
};

export default EmployeeCard;
