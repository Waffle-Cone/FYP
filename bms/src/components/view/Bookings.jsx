import { useNavigate } from "react-router-dom";
import useLoad from "../API/useLoad";
import { useAuth } from "../auth/context/AuthContext";
import { BookingCard, BookingCardContainer } from "../Entity/Booking/BookingCard";
import { CardContainer } from "../UI/Card";
import ListBar from "../UI/ListBar";

const Bookings = () => {
  //Initialisation ------------------------------------------------------
  const { user } = useAuth();

  const navigate = useNavigate();

  let endPoint = "";
  if (user.userType === 1) {
    endPoint = `/bookings`;
  } else {
    endPoint = `/employeereservations/employee/${user.ID}`;
  }

  //state  --------------------------------------------------------------
  const [bookings, setBookings, loadingMessage, loadBookings] = useLoad(endPoint);
  console.log(bookings);
  //Handlers ------------------------------------------------------------
  const showEditMode = () => {
    alert("Edit Mode not available");
  };
  const showForm = () => {
    navigate("/addBooking");
  };
  //View ----------------------------------------------------------------

  return (
    <>
      {user.userType === 1 ? <ListBar editMode={false} showForm={showForm} showEditMode={showEditMode} hideEditMode={{}} /> : null}

      {!bookings ? (
        <p>{loadingMessage}</p>
      ) : bookings.length === 0 ? (
        <p> Add your first booking </p>
      ) : (
        <>
          <BookingCardContainer>
            {bookings.map((booking) => (
              <BookingCard key={booking.Booking_Number} booking={booking} />
            ))}
          </BookingCardContainer>
        </>
      )}
    </>
  );
};

export default Bookings;
