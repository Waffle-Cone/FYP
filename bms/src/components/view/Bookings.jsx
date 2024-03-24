import { useNavigate } from "react-router-dom";
import useLoad from "../API/useLoad";
import { BookingCard, BookingCardContainer } from "../Entity/Booking/BookingCard";
import { CardContainer } from "../UI/Card";
import ListBar from "../UI/ListBar";

const Bookings = () => {
  //Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  const endPoint = `/bookings`;

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
      <ListBar editMode={false} showForm={showForm} showEditMode={showEditMode} hideEditMode={{}} />

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
