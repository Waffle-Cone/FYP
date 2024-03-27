const SetInitial = {};

const watercraft = (initialWatercraft, state) => {
  let isModifyForm = false;
  let selectedID = null;
  let title = "Add Watercraft to Fleet";

  if (state) {
    isModifyForm = true;
    selectedID = state.initialWatercraft.Synthetic_Key; // needed for put later
    console.log("The selected ID is " + selectedID);
    title = "Modify Watercraft";
    initialWatercraft.Boat_Img = state.initialWatercraft.Boat_Img;
    initialWatercraft.Registration = state.initialWatercraft.Registration;
    initialWatercraft.Model_ID = state.initialWatercraft.Model_ID;
    initialWatercraft.Status_ID = state.initialWatercraft.Status_ID;
  } else {
    initialWatercraft.Boat_Img = null;
    initialWatercraft.Registration = null;
    initialWatercraft.Model_ID = 0;
    initialWatercraft.Status_ID = 0;
  }

  return [initialWatercraft, selectedID, title, isModifyForm];
};

const employee = (initialEmployee, state) => {
  let isModifyForm = false;
  let selectedEmployeeID = null;
  let title = "Add Employee";

  if (state) {
    isModifyForm = true;
    selectedEmployeeID = state.initialEmployee.Employee_ID;
    title = "Modify Employee";
    console.log(selectedEmployeeID);

    //set up the initialEmployee object
    initialEmployee.Employee_Name = state.initialEmployee.Employee_Name;
    initialEmployee.Job_ID = state.initialEmployee.Job_ID;
    initialEmployee.Start_Date = state.initialEmployee.Start_Date;
    initialEmployee.Employee_Img = state.initialEmployee.Employee_Img;
  } else {
    initialEmployee.Employee_Name = null;
    initialEmployee.Job_ID = 0;
    initialEmployee.Start_Date = null;
    initialEmployee.Employee_Img = null;
  }

  return [initialEmployee, selectedEmployeeID, title, isModifyForm];
};

const booking = (intialBooking, state) => {
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

  return [intialBooking, selectedBookingNumber, title, isModifyForm];
};

const addCrewMember = (initialEmployeeReservation, state) => {
  const title = "Add Employee to Crew";
  const bookingID = state.bookingNumber;
  const crew = state.crew;
  const alreadyCrewIDs = new Set();
  let crewPresent = true;

  if (crew && crew.length > 0) {
    crew.map((member) => {
      alreadyCrewIDs.add(member.Employee_ID);
    });
  } else {
    crewPresent = false;
    console.log("No crew");
  }
  return [title, bookingID, crewPresent, crew, alreadyCrewIDs];
};

SetInitial.employee = (initialEmployee, state) => employee(initialEmployee, state);
SetInitial.watercraft = (initialWatercraft, state) => watercraft(initialWatercraft, state);
SetInitial.booking = (intialBooking, state) => booking(intialBooking, state);
SetInitial.addCrewMember = (initialEmployeeReservation, state) => addCrewMember(initialEmployeeReservation, state);
export default SetInitial;
