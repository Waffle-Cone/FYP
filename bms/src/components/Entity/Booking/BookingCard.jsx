import PropTypes from "prop-types";
import { Card } from "../../UI/Card";
import "./BookingCard.scss";
import { useNavigate } from "react-router-dom";
import BookingCardLabel from "./BookingCardLabel";
import FormatTimeString from "../../util/FormatTimeString";
import API from "../../API/API";
import Action from "../../UI/Actions";

export const BookingCardContainer = (props) => {
  return <div className="bookingCardContainer"> {props.children}</div>;
};

export const BookingCard = ({ booking, openModal, userType }) => {
  // Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  // State ---------------------------------------------------------------
  //Handlers

  const handleSelect = () => {
    navigate("/bookingDetails", { state: { selectedBooking: booking } });
  };

  // View ----------------------------------------------------------------
  return (
    <div className="card">
      {userType === 1 ? <Action.Delete buttonText="Cancel" showText={false} onClick={() => openModal(booking)}></Action.Delete> : null}
      <button className="bookingCard" onClick={handleSelect}>
        <span className="layout">
          <BookingCardLabel label={"Booking Number"} text={booking.Booking_Number} />
          <BookingCardLabel label={"Date"} text={FormatTimeString.dateTime(booking.BookingDate)} />
          <BookingCardLabel label={"Duration"} text={booking.Duration} />
          <BookingCardLabel label={"Type"} text={booking.Charter_Name} />
        </span>
      </button>
    </div>
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
