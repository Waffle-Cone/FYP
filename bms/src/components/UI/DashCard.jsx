import { NavLink } from "react-router-dom";
import "./DashCard.scss";

const DashCard = ({ name, to }) => {
  //Initialisation ------------------------------------------------------

  //state  --------------------------------------------------------------
  //Handlers ------------------------------------------------------------
  //View ----------------------------------------------------------------
  return (
    <NavLink className={"dashcard"} style={{ textDecoration: "none" }} to={to}>
      <h1> {name} </h1>
    </NavLink>
  );
};

export default DashCard;
