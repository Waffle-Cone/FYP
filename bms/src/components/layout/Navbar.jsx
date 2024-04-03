import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";
import { AdminProtectedLink, ProtectedLink } from "../auth/ProtectedNavLink";
import "./Navbar.scss";

function Navbar({ userType }) {
  const { isLoggedIn, handleLogout } = useAuth();

  const bookingLinktext = () => {
    if (userType === 2) {
      return "Schedule";
    } else {
      return "Bookings";
    }
  };

  return (
    <nav>
      <ProtectedLink isLoggedIn={isLoggedIn}>
        <NavLink to="/home"> Home</NavLink>
      </ProtectedLink>

      <AdminProtectedLink isLoggedIn={isLoggedIn} userType={userType}>
        <NavLink to="/watercraft"> Watercraft </NavLink>
      </AdminProtectedLink>

      <AdminProtectedLink isLoggedIn={isLoggedIn} userType={userType}>
        <NavLink to="/staff"> Staff </NavLink>
      </AdminProtectedLink>

      <ProtectedLink isLoggedIn={isLoggedIn}>
        <NavLink to="/bookings"> {bookingLinktext()} </NavLink>
      </ProtectedLink>

      <div className="navItem" id="login">
        {isLoggedIn ? <button onClick={handleLogout}> Log Out </button> : <NavLink to="/"> Login</NavLink>}
      </div>
    </nav>
  );
}

export default Navbar;
