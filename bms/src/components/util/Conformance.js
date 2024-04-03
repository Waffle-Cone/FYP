const Conformance = {};

const watercraft = {
  html2js: {
    Boat_Img: (value) => (value === "" ? null : value),
    Registration: (value) => (value === "" ? null : value),
    Model_ID: (value) => (value == 0 ? null : parseInt(value)),
    Status_ID: (value) => (value == 0 ? null : parseInt(value)),
  },

  js2html: {
    Boat_Img: (value) => (value === null ? "" : value),
    Registration: (value) => (value === null ? "" : value),
    Model_ID: (value) => (value === null ? 0 : value),
    Status_ID: (value) => (value === null ? 0 : value),
  },
};

const employee = {
  html2js: {
    Employee_Name: (value) => (value === "" ? null : value),
    Job_ID: (value) => (value == 0 ? null : parseInt(value)),
    Start_Date: (value) => (value === "" ? null : value),
    Employee_Img: (value) => (value === "" ? null : value),
  },

  js2html: {
    Employee_Name: (value) => (value === null ? "" : value),
    Job_ID: (value) => (value === null ? 0 : value),
    Start_Date: (value) => (value === null ? "" : value),
    Employee_Img: (value) => (value === null ? "" : value),
  },
};

const booking = {
  html2js: {
    Booking_Notes: (value) => (value === "" ? null : value),
    Charter_Type_ID: (value) => (value == 0 ? null : parseInt(value)),
  },

  js2html: {
    Booking_Notes: (value) => (value === null ? "" : value),
    Charter_Type_ID: (value) => (value === null ? 0 : value),
  },
};

const addCrewMember = {
  html2js: {
    Employee_ID: (value) => (value == 0 ? null : parseInt(value)),
    BoatReservation_ID: (value) => (value == 0 ? null : parseInt(value)),
    EmployeeReservation_ID: (value) => (value == 0 ? null : parseInt(value)),
  },

  js2html: {
    Employee_ID: (value) => (value === null ? 0 : value),
    BoatReservation_ID: (value) => (value === null ? 0 : value),
    EmployeeReservation_ID: (value) => (value === null ? 0 : value),
  },
};

const login = {
  html2js: {
    ID: (value) => (value === null ? "" : value),
    Password: (value) => (value === "" ? null : value),
  },

  js2html: {
    ID: (value) => (value === null ? "" : value),
    Password: (value) => (value === null ? "" : value),
  },
};

Conformance.watercraft = watercraft;
Conformance.employee = employee;
Conformance.booking = booking;
Conformance.addCrewMember = addCrewMember;
Conformance.login = login;

export default Conformance;
