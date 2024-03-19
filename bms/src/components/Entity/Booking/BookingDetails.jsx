import { useNavigate, useLocation } from "react-router-dom";
import useLoad from "../../API/useLoad";
import Action from "../../UI/Actions";
import ListBox from "../../UI/ListBoxStuff/ListBox";
import "./BookingDetails.scss";

const BookingDetails = () => {
  // Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  const { state } = useLocation();

  const booking = state.selectedBooking;

  let selectedBooking = {
    Booking_Number: booking.Booking_Number,
    Booking_Notes: booking.Booking_Notes,
    BookingDate: booking.BookingDate,
    Duration: booking.Duration,
    Charter_Name: booking.Charter_Name,
  };

  const crewMembers = `/employeereservations/${selectedBooking.Booking_Number}`;
  // State ---------------------------------------------------------------
  const [crew, setCrewMembers, loadingCrewMessage, loadCrew] = useLoad(crewMembers);
  console.log(crew);
  // Handlers-------------------------------------------------------------
  const handleBack = () => navigate(-1);
  const handleAdd = () => {
    navigate("/addCrewMember", { state: { crew } });
  };
  // View ----------------------------------------------------------------

  return (
    <div className="pageContainer">
      <div className="topBar">
        <Action.Tray>
          <Action.Back buttonText="Back" showText={true} onClick={handleBack} />
        </Action.Tray>
        <div className="titleContainer">
          <div className="titleText">
            <h1 id="title"> Booking Info </h1>
            <h3>Booking No.{selectedBooking.Booking_Number}</h3>
          </div>
        </div>
        <Action.Tray>
          <Action.Modify buttonText="Edit" showText={true} />
        </Action.Tray>
      </div>
      <ListBox.CrewBox crew={crew} loadingMessage={loadingCrewMessage} handleAdd={handleAdd} />
    </div>
  );
};

export default BookingDetails;
