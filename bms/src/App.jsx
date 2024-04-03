import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/view/Home.jsx";
import Login from "./components/view/Login.jsx";
import PageNotFound from "./components/view/PageNotFound.jsx";
import WaterCraft from "./components/view/Watercraft.jsx";
import WatercraftForm from "./components/entity/watercraft/WatercraftForm.jsx";
import WatercraftDetails from "./components/Entity/watercraft/WatercraftDetails.jsx";
import Employee from "./components/view/Employee.jsx";
import EmployeeForm from "./components/Entity/employee/EmployeeForm.jsx";
import Bookings from "./components/view/Bookings.jsx";
import BookingDetails from "./components/Entity/Booking/BookingDetails.jsx";
import AddCrewMemberToBookingForm from "./components/Entity/Booking/AddCrewMemberToBookingForm.jsx";
import BookingForm from "./components/Entity/Booking/BookingForm.jsx";
import { AuthProvider, useAuth } from "./components/auth/context/AuthContext.jsx";
import { AdminProtectedRoute, ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import { useEffect, useRef } from "react";

const ContextApp = () => {
  const { user, isLoggedIn } = useAuth();
  const userType = useRef(-1);

  if (user !== null) {
    userType.current = user.userType;
    console.log(user);
  } else {
    userType.current = -1;
  }

  console.log(userType.current);

  return (
    <BrowserRouter>
      <Layout userType={userType.current}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Home userType={userType.current} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watercraft"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <WaterCraft />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/addWatercraft"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <WatercraftForm />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/editWatercraft"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <WatercraftForm />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/watercraftDetails"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <WatercraftDetails />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <Employee />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/addStaff"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <EmployeeForm />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/editEmployee"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <EmployeeForm />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute user={user} isLoggedIn={isLoggedIn}>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addBooking"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <BookingForm />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/bookingDetails"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <BookingDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addCrewMember"
            element={
              <AdminProtectedRoute userType={userType.current} isLoggedIn={isLoggedIn}>
                <AddCrewMemberToBookingForm />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AuthProvider>
      <ContextApp />
    </AuthProvider>
  );
}

//protective routes
export default App;
