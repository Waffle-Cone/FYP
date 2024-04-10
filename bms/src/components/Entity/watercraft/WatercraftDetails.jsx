import { useNavigate, useLocation } from "react-router-dom";
import Action from "../../UI/Actions";
import "./WatercraftDetails.scss";

let selectedWatercraft = {
  Synthetic_Key: 0,
  Registration: null,
  Boat_Img: null,
  Model_Name: null,
  Manufacturer_Name: null,
  Weight_Limit_lbs: 0,
  Seating: 0,
  Fuel_Capacity_Gal: 0,
  Model_Description: null,
  Img_URL: null,
  Type: null,
  Status: null,
};

const WatercraftDetails = () => {
  // Initialisations ---------------------
  const navigate = useNavigate(); //used to navigate to diffent pages
  const { state } = useLocation();

  selectedWatercraft = {
    Synthetic_Key: state.selectedWatercraft.Synthetic_Key,
    Registration: state.selectedWatercraft.Registration,
    Boat_Img: state.selectedWatercraft.Boat_Img,
    Model_Name: state.selectedWatercraft.Model_Name,
    Manufacturer_Name: state.selectedWatercraft.Manufacturer_Name,
    Model_Description: state.selectedWatercraft.Model_Description,
    Weight_Limit_lbs: state.selectedWatercraft.Weight_Limit_lbs,
    Seating: state.selectedWatercraft.Seating,
    Fuel_Capacity_Gal: state.selectedWatercraft.Fuel_Capacity_Gal,
    Img_URL: state.selectedWatercraft.Img_URL,
    Type: state.selectedWatercraft.Type,
    Status: state.selectedWatercraft.Status,
  };

  const initialWatercraft = {
    Synthetic_Key: state.selectedWatercraft.Synthetic_Key,
    Boat_Img: state.selectedWatercraft.Boat_Img,
    Registration: state.selectedWatercraft.Registration,
    Model_ID: state.selectedWatercraft.Model_ID,
    Status_ID: state.selectedWatercraft.Status_ID,
  };

  // State -------------------------------
  // Handlers ----------------------------
  console.log();
  const handleBack = () => navigate(-1);

  const handleEdit = () => {
    navigate("/editWatercraft", { state: { initialWatercraft: initialWatercraft } });
  };
  // View --------------------------------
  return (
    <div className="pageContainer">
      <div className="topBar">
        <Action.Tray>
          <Action.Back buttonText="Back" showText={true} onClick={handleBack} />
        </Action.Tray>
        <div className="titleContainer">
          <div className="titleText">
            <h1 id="title"> Watercraft Info </h1>
            <h3>Registration No.{selectedWatercraft.Registration}</h3>
          </div>
        </div>
        <Action.Tray>
          <Action.Modify buttonText="Edit" showText={true} onClick={handleEdit} />
        </Action.Tray>
      </div>
      <div className="infoContainer">
        <div className="leftInfo">
          {!selectedWatercraft.Boat_Img ? ( // If a custom boat image is specified use it. I f not use the default model one
            <img src={selectedWatercraft.Img_URL} />
          ) : (
            <img src={selectedWatercraft.Boat_Img} />
          )}
          <p> {selectedWatercraft.Status}</p>
        </div>
        <div className="centerInfo">
          <div className="info">
            <h5>Manufacturer:</h5>
            <p>{selectedWatercraft.Manufacturer_Name}</p>
          </div>
          <div className="info">
            <h5>Model Name:</h5>
            <p>{selectedWatercraft.Model_Name}</p>
          </div>
          <div className="info">
            <h5>Model Description:</h5>
            <p>{selectedWatercraft.Model_Description}</p>
          </div>
          <div className="info">
            <h5>Type:</h5>
            <p>{selectedWatercraft.Type}</p>
          </div>
        </div>
        <div className="rightInfo">
          <div className="info">
            <h5>Fuel Capacity (Gallons)</h5>
            <p>{selectedWatercraft.Fuel_Capacity_Gal}</p>
          </div>
          <div className="info">
            <h5>Weight Limit (Pounds)</h5>
            <p>{selectedWatercraft.Weight_Limit_lbs}</p>
          </div>
          <div className="info">
            <h5>Max Seating</h5>
            <p>{selectedWatercraft.Seating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatercraftDetails;
