const FormInputErrorMessages = {};

const watercraft = {
  Boat_Img: "Invalid URL",
  Registration: "Invalid Registration Number",
  Model_ID: "No model selected",
  Status_ID: "No Status selected",
};

const employee = {
  Employee_Name: "Enter Name",
  Job_ID: "No job selected",
  Start_Date: "No start date selected",
  Employee_Img: "Invalid URL",
};

const booking = {
  Booking_Notes: "",
  BookingDate: "Date and Time must be set",
  Duration: "Start and End time must be set",
  Charter_Type_ID: "Enter Charter Type",
};

const addCrewMember = {
  Employee_ID: "No Employee Selected",
  BoatReservation_ID: "No Boat Selected",
  EmployeeReservation_ID: "Not set",
};

FormInputErrorMessages.watercraft = watercraft;
FormInputErrorMessages.employee = employee;
FormInputErrorMessages.booking = booking;
FormInputErrorMessages.addCrewMember = addCrewMember;

export default FormInputErrorMessages;
