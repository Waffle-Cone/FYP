import { useEffect, useRef, useState } from "react";
import useLoad from "../../API/useLoad";
import "./WatercraftListCard.scss";

export const WatercraftListCard = ({ boat, select, selectedBoats, handleDeselect }) => {
  // Initialisations ---------------------
  const isSelected = useRef(false);

  useEffect(() => {
    if (selectedBoats != undefined) {
      Array.from(selectedBoats).find((search) => (search.Registration === boat.Registration ? (isSelected.current = true) : (isSelected.current = false)));
    }
  }, [isSelected.current]);

  // State -------------------------------
  // Handlers ----------------------------
  const handleButtonSelected = () => {
    if (isSelected.current) {
      handleDeselect(boat);
      //isSelected.current = false;
    } else {
      select(boat);
      //isSelected.current = true;
    }
  };
  // View --------------------------------
  return (
    <button
      className={`container${isSelected.current ? "-selected" : ""}`}
      onClick={() => {
        handleButtonSelected();
      }}
    >
      <p id="Registration">({boat.Registration})</p>
      <p id="Model_Name">{boat.Model_Name}</p>
    </button>
  );
};

export const SelectedWatercraftCard = ({ boat, handleDeselect }) => {
  return (
    <div className="selectedBoat">
      <div className="boatDetails">
        <p id="Registration">({boat.Registration})</p>
        <p id="Model_Name">{boat.Model_Name}</p>
      </div>
      <button onClick={() => handleDeselect(boat)}>Remove</button>
    </div>
  );
};
