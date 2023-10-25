import { NavLink } from "react-router-dom";
import "./Navbar.scss";

function Navbar(options) {
    return(
        <nav>
          <div className="navItem">
            <NavLink to = "/Home"> Home</NavLink>
          </div>

          <div className="navItem">
            <NavLink to = "/Staff"> Staff </NavLink>
          </div>
          <div className="navItem">
            <NavLink to = "/Bookings"> Bookings </NavLink>
          </div>

          <div className="navItem" id="login">
            <NavLink to = "/Login"> Login</NavLink>
          </div>
      </nav>

    );
}

export default Navbar;