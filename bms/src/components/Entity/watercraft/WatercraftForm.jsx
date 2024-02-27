import { useState, useEffect, Button } from "react";
import API from "../../API/API";
import { useLocation, useNavigate } from "react-router-dom";
import isURL from "is-url";
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";
import FORM from "../../UI/Form";

const initialWatercraft = {
  Boat_Img: null,
  Registration: null,
  Model_ID: 0,
  Status_ID: 0,
};

function WatercraftForm({ onSuccess }) {
  // Initialisation ------------------------------
  const navigate = useNavigate(); //used to navigate to diffent pages
  const { state } = useLocation();

  let isModifyForm = false;
  let selectedID = null;
  let title = "Add Watercraft to Fleet";

  if (state) {
    initialWatercraft.Boat_Img = state.initialWatercraft.Boat_Img;
    initialWatercraft.Registration = state.initialWatercraft.Registration;
    initialWatercraft.Model_ID = state.initialWatercraft.Model_ID;
    initialWatercraft.Status_ID = state.initialWatercraft.Status_ID;

    selectedID = state.initialWatercraft.Synthetic_Key; // needed for put later
    console.log("The selected ID is " + selectedID);
    title = "Modify Watercraft";
    isModifyForm = true;
  } else {
    initialWatercraft.Boat_Img = null;
    initialWatercraft.Registration = null;
    initialWatercraft.Model_ID = 0;
    initialWatercraft.Status_ID = 0;
  }

  const conformance = {
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

  const isValid = {
    Boat_Img: (value) => (value === null ? true : isURL(value)),
    Registration: (value) => {
      if (value !== null) {
        return value.length > 0 && value.length < 100;
      } else {
        return false;
      }
    },
    Model_ID: (value) => value != 0 || value != "0",
    Status_ID: (value) => value != 0 || value != "0",
  };

  const errorMessage = {
    Boat_Img: "Invalid URL",
    Registration: "Invalid Registration Number",
    Model_ID: "No model selected",
    Status_ID: "No Status selected",
  };

  const modelsEndpoint = "/model";
  const postWatercraftEndpoint = "/boats";
  const putWatercraftEndpoint = "/boats";
  const statusEndpoint = "/status";

  //State ---------------------------------------
  const [watercraft, setWatercraft] = useState(initialWatercraft);
  const [modelList, setModelList, loadingModelsMessage, loadModels] = useLoad(modelsEndpoint);
  const [statusList, setStatusList, loadingStatusMessage, loadStatus] = useLoad(statusEndpoint);
  const [errors, setErrors] = useState(Object.keys(initialWatercraft).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  //Handlers -------------------------------------
  const handleCancel = () => {
    navigate("/watercraft");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const conformedValue = conformance.html2js[name](value);
    setWatercraft({ ...watercraft, [name]: conformedValue });
    setErrors({ ...errors, [name]: isValid[name](conformedValue) ? null : errorMessage[name] });
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]); // I NEED THIS == without it all the error message are one step behind

  const isValidWatercraft = (watercraft) => {
    let isWatercraftValid = true;
    Object.keys(watercraft).forEach((key) => {
      // we do this becasue setErrors is asychronous thus we cannot determine its stte when we need to go through it
      if (isValid[key](watercraft[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isWatercraftValid = false;
      }
    });
    return isWatercraftValid;
  };

  const handleSubmit = async () => {
    //console.log(`watercraft=[${JSON.stringify(watercraft)}]`);
    const check = isValidWatercraft(watercraft);
    setErrors({ ...errors });
    if (check) {
      let result = null;
      if (isModifyForm) {
        result = await API.put(`${putWatercraftEndpoint}/${selectedID}`, watercraft);
      } else {
        result = await API.post(postWatercraftEndpoint, watercraft);
      }
      console.log(result);
      if (result.isSuccess) {
        console.log("Insert success");
        navigate("/watercraft");
      } else {
        console.log(`Insert NOT Successful: ${result.message}`);
      }
    }
  };

  //View -----------------------------------------
  return (
    <>
      <FORM.Container>
        <h1 id="title">{title}</h1>
        <FORM.Tray>
          <FORM.Input
            htmlFor="Registration"
            text="Registration Number"
            type="text"
            FieldName="Registration"
            conformance={conformance.js2html["Registration"](watercraft.Registration)}
            onChange={handleChange}
            errors={errors.Registration}
          />
          <FORM.Select
            htmlFor="Model_ID"
            text="Model"
            list={modelList}
            loadingMessage={loadingModelsMessage}
            name="Model_ID"
            conformance={conformance.js2html["Model_ID"](watercraft.Model_ID)}
            onChange={handleChange}
            listKey="Model_ID"
            listValue="Model_ID"
            listText="Model_Name"
            errors={errors.Model_ID}
          />

          <FORM.Select
            htmlFor="Status"
            text="Status"
            list={statusList}
            loadingMessage={loadingStatusMessage}
            name="Status_ID"
            conformance={conformance.js2html["Status_ID"](watercraft.Status_ID)}
            onChange={handleChange}
            listKey="Status_ID"
            listValue="Status_ID"
            listText="Status"
            errors={errors.Status_ID}
          />

          <FORM.Input
            htmlFor="Boat_Img"
            text="Image URL"
            type="text"
            FieldName="Boat_Img"
            value={conformance.js2html["Boat_Img"](watercraft.Boat_Img)}
            onChange={handleChange}
            errors={errors.Boat_Img}
          />
        </FORM.Tray>

        <Action.Tray>
          <Action.Cancel buttonText="Cancel" showText={true} onClick={handleCancel}></Action.Cancel>
          <Action.Submit buttonText="Submit" showText={true} onClick={handleSubmit}></Action.Submit>
        </Action.Tray>
      </FORM.Container>
    </>
  );
}

export default WatercraftForm;
