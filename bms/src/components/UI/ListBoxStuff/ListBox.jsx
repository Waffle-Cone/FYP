import { useState } from "react";
import useLoad from "../../API/useLoad";
import { useAuth } from "../../auth/context/AuthContext";
import Action from "../Actions";
import EmployeeListCard from "./EmployeeListCard";
import "./ListBox.scss";
import { WatercraftListCard, SelectedWatercraftCard } from "./WatercraftListCard";

export default function ListBox({ children, handleAdd, title, error }) {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <>
      <div className="ListBox">
        <h3>{title}</h3>
        {handleAdd ? (
          <Action.Tray>
            <Action.Add buttonText="Add Crew Memeber" showText={true} onClick={handleAdd} />
          </Action.Tray>
        ) : null}

        <div className="List">{children}</div>
      </div>
      <span style={{ color: "red" }}>{error}</span>
    </>
  );
}

const CrewBox = ({ crew, loadingMessage, handleAdd, title }) => {
  // Initialisations ---------------------
  const { user } = useAuth();

  if (user.userType === 2) {
    handleAdd = false;
    title = "Crew Members";
  }

  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ListBox handleAdd={handleAdd} title={title}>
      {!crew ? (
        <p>{loadingMessage}</p>
      ) : crew.length === 0 ? (
        <p> Add Crew Member </p>
      ) : (
        <div className="scrolling">
          {crew.map((employee) => (
            <EmployeeListCard key={employee.Employee_ID} employee={employee} />
          ))}
        </div>
      )}
    </ListBox>
  );
};

const BoatBox = ({ bookingDate, handleAdd, handleSelect, handleDeselect, selectedBoats, title, error }) => {
  // Initialisations ---------------------

  let date = "";
  let availableBoatsEndpoint = ``;
  if (bookingDate) {
    date = bookingDate.replaceAll(/\//g, "-");
    availableBoatsEndpoint = `/boats/availableondate/${date}`;
  } else {
    availableBoatsEndpoint = `/boats`;
  }

  // State -------------------------------
  const [availableBoats, setAvailableBoats, loadingMessage, loadBoats] = useLoad(availableBoatsEndpoint);
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ListBox handleAdd={handleAdd} title={title} error={error}>
      {!availableBoats ? (
        <p>{loadingMessage}</p>
      ) : availableBoats.length === 0 ? (
        <p> No available boats </p>
      ) : (
        <>
          <div className="scrolling">
            {availableBoats.map((boat) => (
              <WatercraftListCard key={boat.Registration} boat={boat} select={handleSelect} selectedBoats={selectedBoats} handleDeselect={handleDeselect} />
            ))}
          </div>
          <div className="selectedWatercraft">
            <h3>Selected:</h3>
            {selectedBoats ? Array.from(selectedBoats).map((boat) => <SelectedWatercraftCard key={boat.Registration} boat={boat} handleDeselect={handleDeselect} />) : null}
          </div>
        </>
      )}
    </ListBox>
  );
};

// -----------------------------------------
// Compose Icon Object /////////////////////
// -----------------------------------------

ListBox.CrewBox = CrewBox;
ListBox.BoatBox = BoatBox;
