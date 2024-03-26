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

Conformance.watercraft = watercraft;
Conformance.employee = employee;

export default Conformance;
