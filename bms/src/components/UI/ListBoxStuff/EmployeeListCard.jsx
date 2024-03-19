import useLoad from "../../API/useLoad";
import "./EmployeeListCard.scss";

const EmployeeListCard = ({ employee }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <div className="container">
      <p id="job">({employee.Job_Name})</p>
      <p id="name">{employee.Employee_Name}</p>
      <p id="boat">{employee.Model_Name}</p>
    </div>
  );
};

export default EmployeeListCard;
