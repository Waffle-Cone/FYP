import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar(options) {
  return (
    <nav>
      <div className="navItem">
        <NavLink to="/"> Home</NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/watercraft"> Watercraft </NavLink>
      </div>

      <div className="navItem">
        <NavLink to="/staff"> Staff </NavLink>
      </div>
      <div className="navItem">
        <NavLink to="/bookings"> Bookings </NavLink>
      </div>

      <div className="navItem" id="login">
        <NavLink to="/login"> Login</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
