import { useNavigate } from "react-router-dom";
import useLoad from "../API/useLoad";
import { BookingCard, BookingCardContainer } from "../Entity/Booking/BookingCard";
import { CardContainer } from "../UI/Card";

const Bookings = () => {
  //Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  const endPoint = `/bookings`;

  //state  --------------------------------------------------------------
  const [bookings, setBookings, loadingMessage, loadBookings] = useLoad(endPoint);
  console.log(bookings);
  //Handlers ------------------------------------------------------------
  //View ----------------------------------------------------------------

  return (
    <>
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
