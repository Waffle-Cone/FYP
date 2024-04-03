import { Navigate } from "react-router-dom";

export const AdminProtectedRoute = ({ userType, isLoggedIn, children }) => {
  if (isLoggedIn) {
    if (userType === 1) {
      return children;
    } else {
      return <Navigate to="/UnauthorizedAccess" replace />;
    }
  } else {
    return <Navigate to="/" replace />;
  }
};

export const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/" replace />;
  }
};
