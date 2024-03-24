import { useLocation, useNavigate } from "react-router-dom";
import FORM from "../../UI/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import Icon from "../../UI/Icons";
import { useEffect, useRef, useState } from "react";
import FormatTimeString from "../../util/FormatTimeString";
import Action from "../../UI/Actions";

const intialBooking = {
  Booking_Notes: null,
  BookingDate: null,
  Duration: null,
  Charter_Type_ID: 0,
};

function BookingForm() {
  // Initialisations ------------------
  const navigate = useNavigate(); //used to navigate to diffent pages
  const { state } = useLocation();

  //One form for both add and modify
  let isModifyForm = false;
  let selectedBookingNumber = null;
  let title = "Add Booking";

  if (state) {
    isModifyForm = true;
    selectedBookingNumber = state.intialBooking.Booking_Number;
    title = "Modify Booking";
    console.log(selectedBookingNumber);

    //set up the intialBooking object
    intialBooking.Booking_Notes = state.intialBooking.Booking_Notes;
    intialBooking.BookingDate = state.intialBooking.BookingDate;
    intialBooking.Duration = state.intialBooking.Duration;
    intialBooking.Charter_Type_ID = state.intialBooking.Charter_Type_ID;
  } else {
    intialBooking.Booking_Notes = null;
    intialBooking.BookingDate = null;
    intialBooking.Duration = null;
    intialBooking.Charter_Type_ID = 0;
  }

  const checkTime = () => {
    const bookingStartDateTime = new Date(`2024/03/26 ${startTime}:00`);
    const bookingFinishDateTime = new Date(`2024/03/26 ${finishTime}:00`);

    if (bookingFinishDateTime < bookingStartDateTime) {
      setTimeError("Start time must be before Finish time");
    } else {
      setTimeError(null);
    }
  };

  // State ----------------------------
  const [booking, setBooking] = useState(intialBooking);
  const [errors, setErrors] = useState(Object.keys(intialBooking).reduce((acc, key) => ({ ...acc, [key]: null }), {}));
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
  const [finishTimeError, setFinishTimeError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    checkTime();
  }, [finishTime]);
  useEffect(() => {
    checkTime();
  }, [startTime]);

  // Handlers -------------------------

  const handleDate = (date) => {
    const bookingDate = FormatTimeString.dateString(date);
    dateAndTimeErros(date, true, true);
    console.log(bookingDate);
    setDate(bookingDate);
  };

  const handleTimeStart = (startTime) => {
    dateAndTimeErros(true, startTime, true);
    setStartTime(startTime);
  };
  const handleFinishTime = (finishTime) => {
    dateAndTimeErros(true, true, finishTime);
    setFinishTime(finishTime);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const dateAndTimeErros = (date, startTime, finishTime) => {
    if (date === null) {
      setDateError("Enter Date");
    } else {
      setDateError(null);
    }
    if (startTime === null) {
      setStartTimeError("Enter start time");
    } else {
      setStartTimeError(null);
    }
    if (finishTime === null && startTime !== null) {
      setFinishTimeError("Enter finish time");
    } else {
      setFinishTimeError(null);
    }
  };

  const handleDateSubmission = () => {
    let dateSubmissionReady = true;
    if (date === null || startTime === null || finishTime === null || timeError !== null) {
      dateSubmissionReady = false;
      dateAndTimeErros(date, startTime, finishTime);
    } else {
      dateAndTimeErros(date, startTime, finishTime);
      const bookingStartDateTime = `${date} ${startTime}:00`;

      const bookingFinishDateTime = `${date} ${finishTime}:00`;
      const timeDifference = new Date(new Date(bookingFinishDateTime) - new Date(bookingStartDateTime));

      //making duration string for submission
      const hours = timeDifference.getHours() - 1;
      const minutes = timeDifference.getMinutes();

      const bookingDuration = `${hours}:${minutes}:00`;
      console.log(`bookingDateTime: ${bookingStartDateTime}`);
      console.log(`bookingDuaration: ${bookingDuration}`);

      booking.BookingDate = bookingStartDateTime;
      booking.Duration = bookingDuration;
      setBooking({ ...booking, ["BookingDate"]: bookingStartDateTime, ["Duration"]: bookingDuration });
    }
    return dateSubmissionReady;
  };

  const handleSubmit = () => {
    const datesReady = handleDateSubmission();
    console.log(datesReady);
    console.log(booking);
  };
  // View -----------------------------
  return (
    <>
      <TimePicker />
      <FORM.Container>
        <h1 id="title">{title}</h1>
        <FORM.Tray></FORM.Tray>
        <label>
          Booking Date
          <span style={{ display: "flex" }}>
            <Icon.Calendar />
            <DatePicker selected={date} onChange={(date) => handleDate(date)} className="datePicker" dateFormat="dd/MM/yyyy" />
          </span>
          <span style={{ color: "red" }}>{dateError}</span>
        </label>

        <label>
          Start Time
          <span style={{ display: "flex" }}>
            <Icon.Calendar />
            <TimePicker value={startTime} onChange={(value) => handleTimeStart(value)} disableClock={true} hourPlaceholder={"hh"} minutePlaceholder={"mm"} />
          </span>
          <span style={{ color: "red" }}>{timeError || startTimeError}</span>
        </label>

        {startTime ? (
          <label>
            Finish Time
            <span style={{ display: "flex" }}>
              <Icon.Calendar />
              <TimePicker value={finishTime} onChange={(value) => handleFinishTime(value)} disableClock={true} hourPlaceholder={"hh"} minutePlaceholder={"mm"} />
            </span>
            <span style={{ color: "red" }}>{timeError || finishTimeError}</span>
          </label>
        ) : null}
        <Action.Tray>
          <Action.Cancel buttonText="Cancel" showText={true} onClick={handleCancel}></Action.Cancel>
          <Action.Submit buttonText="Submit" showText={true} onClick={handleSubmit}></Action.Submit>
        </Action.Tray>
      </FORM.Container>
    </>
  );
}

export default BookingForm;
