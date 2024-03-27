import useLoad from "../../API/useLoad";
import "./WatercraftListCard.scss";

const WatercraftListCard = ({ boat, select }) => {
  // Initialisations ---------------------
  // State -------------------------------
  // Handlers ----------------------------
  // View --------------------------------
  return (
    <button className="container" onClick={() => select(boat)}>
      <p id="Registration">({boat.Registration})</p>
      <p id="Model_Name">{boat.Model_Name}</p>
    </button>
  );
};

export default WatercraftListCard;
