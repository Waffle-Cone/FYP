import { useState } from "react";
import useLoad from "../../API/useLoad";
import Action from "../Actions";
import EmployeeListCard from "./EmployeeListCard";
import "./ListBox.scss";
import WatercraftListCard from "./WatercraftListCard";

export default function ListBox({ children, handleAdd, title }) {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <div className="ListBox">
      <h3>{title}</h3>
      {handleAdd ? (
        <Action.Tray>
          <Action.Add buttonText="Add Crew Memeber" showText={true} onClick={handleAdd} />
        </Action.Tray>
      ) : null}

      <div className="List">{children}</div>
    </div>
  );
}

const CrewBox = ({ crew, loadingMessage, handleAdd, title }) => {
  // Initialisations ---------------------
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

const BoatBox = ({ bookingDate, handleAdd, handleSelect, selectedBoats, title }) => {
  // Initialisations ---------------------

  let date = "";
  let availableBoatsEndpoint = ``;
  if (bookingDate) {
    date = bookingDate.replaceAll(/\//g, "-");
    console.log(` BOATBOX === ${date}`);
    availableBoatsEndpoint = `/boats/availableondate/${date}`;
  } else {
    availableBoatsEndpoint = `/boats`;
  }

  console.log(selectedBoats);
  // State -------------------------------
  const [availableBoats, setAvailableBoats, loadingMessage, loadBoats] = useLoad(availableBoatsEndpoint);
  //console.log(availableBoats);
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <ListBox handleAdd={handleAdd} title={title}>
      {!availableBoats ? (
        <p>{loadingMessage}</p>
      ) : availableBoats.length === 0 ? (
        <p> No available boats </p>
      ) : (
        <>
          <div className="scrolling">
            {availableBoats.map((boat) => (
              <WatercraftListCard key={boat.Registration} boat={boat} select={handleSelect} />
            ))}
          </div>
          <div className="selectedWatercraft">
            <h3>Selected:</h3>
            {selectedBoats ? Array.from(selectedBoats).map((boat) => <p key={boat.Registration}>{boat.Registration}</p>) : null}
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
