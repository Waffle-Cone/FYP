import PropTypes from "prop-types";
import { Card } from "../../UI/Card";
import "./BookingCard.scss";
import { useNavigate } from "react-router-dom";
import BookingCardLabel from "./BookingCardLabel";

export const BookingCardContainer = (props) => {
  return <div className="bookingCardContainer"> {props.children}</div>;
};

export const BookingCard = ({ booking }) => {
  // Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  // State ---------------------------------------------------------------
  //Handlers

  const handleSelect = () => {
    navigate("/bookingDetails", { state: { selectedBooking: booking } });
  };

  // View ----------------------------------------------------------------
  return (
    <button className="bookingCard" onClick={handleSelect}>
      <span className="layout">
        <BookingCardLabel label={"Booking Number"} text={booking.Booking_Number} />
        <BookingCardLabel label={"Date"} text={booking.BookingDate} />
        <BookingCardLabel label={"Duration"} text={booking.Duration} />
        <BookingCardLabel label={"Type"} text={booking.Charter_Name} />
      </span>
    </button>
  );
};

BookingCard.propTypes = {
  booking: PropTypes.shape({
    Booking_Notes: PropTypes.string,
    Booking_Number: PropTypes.number.isRequired,
    Charter_Name: PropTypes.string.isRequired,
    BookingDate: PropTypes.string.isRequired,
    Duration: PropTypes.string.isRequired,
  }),
};
