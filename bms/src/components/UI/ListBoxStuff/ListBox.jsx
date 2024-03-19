import Action from "../Actions";
import EmployeeListCard from "./EmployeeListCard";
import "./ListBox.scss";

export default function ListBox({ children, handleAdd }) {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <div className="ListBox">
      <h3>Crew Members</h3>
      <Action.Tray>
        <Action.Add buttonText="Add Crew Memeber" showText={true} onClick={handleAdd} />
      </Action.Tray>
      <div className="List">{children}</div>
    </div>
  );
}

const CrewBox = ({ crew, loadingMessage, handleAdd }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ListBox handleAdd={handleAdd}>
      {!crew ? (
        <p>{loadingMessage}</p>
      ) : crew.length === 0 ? (
        <p> Add Crew Member </p>
      ) : (
        <>
          {crew.map((employee) => (
            <EmployeeListCard key={employee.Employee_ID} employee={employee} />
          ))}
        </>
      )}
    </ListBox>
  );
};

// -----------------------------------------
// Compose Icon Object /////////////////////
// -----------------------------------------

ListBox.CrewBox = CrewBox;
