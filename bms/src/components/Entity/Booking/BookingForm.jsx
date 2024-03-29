import { useLocation, useNavigate } from "react-router-dom";
import API from "../../API/API";
import useLoad from "../../API/useLoad";
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
import Conformance from "../../util/Conformance";
import SetInitial from "../../util/SetInitial";
import IsInputValid from "../../util/IsInputValid";
import FormInputErrorMessages from "../../util/FormInputErrorMessages";
import { bookingEndpoints } from "../../util/FormEndpoints";
import ListBox from "../../UI/ListBoxStuff/ListBox";
import PostMultipleObjects from "../../util/postMultipleObjects";

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
  const [theBooking, selectedBookingNumber, title, isModifyForm] = SetInitial.booking(intialBooking, state);

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
  const [booking, setBooking] = useState(theBooking);
  const [charterTypes, setCharterTypes, loadingChartersMessage, loadTypes] = useLoad(bookingEndpoints.charterTypesEndpoint);

  const [errors, setErrors] = useState(Object.keys(booking).reduce((acc, key) => ({ ...acc, [key]: null }), {}));
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [startTimeError, setStartTimeError] = useState(null);
  const [finishTime, setFinishTime] = useState(null);
  const [finishTimeError, setFinishTimeError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [boatError, setBoatError] = useState(null);

  //SelectedWatercraft

  const [selectedBoats, setSelectedBoats] = useState(new Set());

  useEffect(() => {
    checkTime();
  }, [finishTime]);
  useEffect(() => {
    checkTime();
  }, [startTime]);

  // Handlers -------------------------
  const handleNotesAndType = (event) => {
    const { name, value } = event.target;
    const conformedValue = Conformance.booking.html2js[name](value);
    setBooking({ ...booking, [name]: conformedValue });
    setErrors({ ...errors, [name]: IsInputValid.booking[name](conformedValue) ? null : FormInputErrorMessages.booking[name] });
  };

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
      booking.BookingDate = null;
      booking.Duration = null;
      setBooking({ ...booking, ["BookingDate"]: null, ["Duration"]: null });
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

  const boatCheck = () => {
    if (selectedBoats["size"] === 0) {
      setBoatError("Please select boat(s)");
      return false;
    } else {
      setBoatError(null);
      return true;
    }
  };

  const handleSelect = (boat) => {
    selectedBoats.add(boat);
    setSelectedBoats(new Set(selectedBoats));
  };
  const handleDeselect = (boat) => {
    selectedBoats.delete(boat);
    setSelectedBoats(new Set(selectedBoats));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const datesReady = handleDateSubmission();
    const isBoatReady = boatCheck();
    const check = IsInputValid.isValidWithException(booking, IsInputValid.booking, errors, FormInputErrorMessages.booking, "Booking_Notes");

    if (datesReady && check && isBoatReady) {
      console.log(`submitting bookig: ${JSON.stringify(booking)}`);
      // selectedBoats.forEach((boat) => console.log(boat));

      let result = null;
      result = await API.post(bookingEndpoints.post, booking);

      if (result.isSuccess) {
        console.log("Booking Insert success");

        PostMultipleObjects.boatReservation(result.result.pop()["Booking_Number"], selectedBoats);
        navigate("/bookings");
      } else {
        console.log(`Insert NOT Successful: ${result.message}`);
      }
    } else {
      console.log("is dates ready", datesReady);
      console.log("is boats ready", isBoatReady);

      console.log(errors);
    }
  };

  // View -----------------------------
  return (
    <>
      <FORM.Container>
        <h1 id="title">{title}</h1>
        <FORM.Tray>
          <FORM.Select
            htmlFor="Charter_Type_ID"
            text="Charter Type"
            list={charterTypes}
            loadingMessage={loadingChartersMessage}
            name="Charter_Type_ID"
            conformance={Conformance.booking.js2html["Charter_Type_ID"](booking.Charter_Type_ID)}
            onChange={handleNotesAndType}
            listKey="Charter_Type_ID"
            listValue="Charter_Type_ID"
            listText="Charter_Name"
            errors={errors.Charter_Type_ID}
          />
          <FORM.Input
            htmlFor="Booking_Notes"
            text="Booking Notes "
            type="text"
            FieldName="Booking_Notes"
            conformance={Conformance.booking.js2html["Booking_Notes"](booking.Booking_Notes)}
            onChange={handleNotesAndType}
            errors={errors.Booking_Notes}
          />
        </FORM.Tray>
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
        {date ? (
          <ListBox.BoatBox
            bookingDate={date}
            title={"Select Watercraft"}
            handleSelect={handleSelect}
            handleDeselect={handleDeselect}
            selectedBoats={selectedBoats}
            error={boatError}
          />
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
