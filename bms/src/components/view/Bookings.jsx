import { useNavigate } from "react-router-dom";
import API from "../API/API";
import useLoad from "../API/useLoad";
import { useAuth } from "../auth/context/AuthContext";
import { BookingCard, BookingCardContainer } from "../Entity/Booking/BookingCard";
import { CardContainer } from "../UI/Card";
import ListBar from "../UI/ListBar";
import MODAL from "../UI/Modal";

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
  const [showModal, setShowModal, handleModalClose, handleModalShow, toDelete, setToDelete] = MODAL.useModal();

  console.log(bookings);
  //Handlers ------------------------------------------------------------
  const showEditMode = () => {
    alert("Edit Mode not available");
  };
  const showForm = () => {
    navigate("/addBooking");
  };

  const openModal = (selectedBooking) => {
    setShowModal(true);
    setToDelete(selectedBooking);
  };

  const handleDelete = async () => {
    console.log("Cancel Booking" + toDelete.Booking_Number);
    const selectedID = toDelete.Booking_Number;

    console.log(" booking: Deleted Booking");
    const result = await API.delete(`/bookings/${selectedID}`);
    console.log(result);
    setShowModal(false);
    if (result.isSuccess == false) {
      alert(`Delete NOT Successful: ${result.message}`);
    }
    loadBookings(endPoint);
  };

  //View ----------------------------------------------------------------

  return (
    <>
      {!showModal ? null : MODAL.DeleteConfirm(showModal, handleModalClose, toDelete, handleDelete, "booking")}

      {user.userType === 1 ? <ListBar editMode={false} showForm={showForm} showEditMode={showEditMode} hideEditMode={{}} /> : null}

      {!bookings ? (
        <p>{loadingMessage}</p>
      ) : bookings.length === 0 ? (
        <p> Add your first booking </p>
      ) : (
        <>
          <BookingCardContainer>
            {bookings.map((booking) => (
              <BookingCard key={booking.Booking_Number} booking={booking} openModal={openModal} userType={user.userType} />
            ))}
          </BookingCardContainer>
        </>
      )}
    </>
  );
};

export default Bookings;
