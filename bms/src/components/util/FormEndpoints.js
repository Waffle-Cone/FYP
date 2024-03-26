export const watercraftEndpoints = {
  modelsEndpoint: "/model",
  postWatercraftEndpoint: "/boats",
  putWatercraftEndpoint: "/boats",
  statusEndpoint: "/status",
};

export const employeeEndpoints = {
  jobsEndpoint: "/jobs",
  postEmployeeEndpoint: "/employees",
  putEmployeeEndpoint: "/employees",
};

export const bookingEndpoints = {
  post: "/bookings",
  charterTypesEndpoint: "/charters",
};

export const addCrewMemberEndpoints = {
  getBoatReservations: function (bookingID) {
    return `/boatsreservations/booking/${bookingID}`;
  },
  postNewCrewMemberEndpoint: "/employeereservations",
  allEmployeesEnpoint: `/employees`,
};
