import API from "../API/API";

const PostMultipleObjects = {};

const boatReservation = (bookingNumber, boats) => {
  const postEndpoint = `/boatsreservations`;

  boats.forEach(async (boat) => {
    const reservation = { Registration: boat.Registration, Booking_Number: bookingNumber };
    console.log(reservation);
    let result = null;
    result = await API.post(postEndpoint, reservation);

    if (result.isSuccess) {
      console.log(boat.Registration, "Insert success");
    } else {
      console.log(`Insert NOT Successful: ${result.message}`);
    }
  });
};

PostMultipleObjects.boatReservation = (bookingNumber, boats) => boatReservation(bookingNumber, boats);

export default PostMultipleObjects;
