import responseSetting from "../helperFunctions/ResponseSetting.js";
import Query from "../Query/Query.js";

const getBoatReservationController = async (req, res) => {

    const id = req.params.id;

    const table = 'boats';
    const extendedTable = `${table} LEFT JOIN boatreservation ON boats.Registration = boatreservation.Registration
    LEFT JOIN bookings ON boatreservation.Booking_Number = bookings.Booking_Number
    LEFT JOIN chartertype ON bookings.Charter_Type_ID = chartertype.Charter_Type_ID`;

    var extendedField = ['bookings.Booking_Notes,bookings.Date,bookings.Duration,bookings.Charter_Type_ID'];

    let sql = `SELECT ${extendedField} FROM ${extendedTable} WHERE boats.Synthetic_key = ${id}`
 
    // EXECUTE SQL
    const {isSuccess, result, message} = await Query.read(sql);
    // RESPONSES 
    responseSetting(res,'GET',result,message,isSuccess); // sets up the res.json for me
    

};

export default getBoatReservationController;