import "./BookingCardLabel.scss";

function BookingCardLabel({ label, text }) {
  // Initialisation ------------------------------------------------------
  // State ---------------------------------------------------------------
  //Handlers
  // View ----------------------------------------------------------------
  return (
    <div className="cardLabel">
      <h5>{label}:</h5>
      <p>{text}</p>
    </div>
  );
}

export default BookingCardLabel;
