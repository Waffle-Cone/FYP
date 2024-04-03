import { Navigate } from "react-router-dom";
import "./ProtectedNavLink.scss";

export const AdminProtectedLink = ({ userType, isLoggedIn, children }) => {
  if (isLoggedIn && userType === 1) {
    return <div className="navItem">{children}</div>;
  } else {
    return null;
  }
};

export const ProtectedLink = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <div className="navItem">{children}</div>;
  } else {
    return null;
  }
};
