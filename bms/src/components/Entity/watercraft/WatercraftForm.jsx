import { useState, useEffect, Button } from "react";
import API from "../../API/API";
import { useLocation, useNavigate } from "react-router-dom";
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";
import FORM from "../../UI/Form";
import Conformance from "../../util/Conformance";
import SetInitial from "../../util/SetInitial";
import IsInputValid from "../../util/IsInputValid";
import FormInputErrorMessages from "../../util/FormInputErrorMessages";
import { watercraftEndpoints } from "../../util/FormEndpoints";

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

  const [theWatercraft, selectedID, title, isModifyForm] = SetInitial.watercraft(initialWatercraft, state);

  //State ---------------------------------------
  const [watercraft, setWatercraft] = useState(theWatercraft);
  const [modelList, setModelList, loadingModelsMessage, loadModels] = useLoad(watercraftEndpoints.modelsEndpoint);
  const [statusList, setStatusList, loadingStatusMessage, loadStatus] = useLoad(watercraftEndpoints.statusEndpoint);
  const [errors, setErrors] = useState(Object.keys(watercraft).reduce((acc, key) => ({ ...acc, [key]: null }), {}));

  //Handlers -------------------------------------

  const handleChange = (event) => {
    const { name, value } = event.target;
    const conformedValue = Conformance.watercraft.html2js[name](value);
    setWatercraft({ ...watercraft, [name]: conformedValue });
    setErrors({ ...errors, [name]: IsInputValid.watercraft[name](conformedValue) ? null : FormInputErrorMessages.watercraft[name] });
  };

  useEffect(() => {
    setErrors(errors);
  }, [errors]); // I NEED THIS == without it all the error message are one step behind

  const handleCancel = () => {
    navigate("/watercraft");
  };

  const handleSubmit = async () => {
    //console.log(`watercraft=[${JSON.stringify(watercraft)}]`);
    const check = IsInputValid.isValid(watercraft, IsInputValid.watercraft, errors, FormInputErrorMessages.watercraft);
    setErrors({ ...errors });
    if (check) {
      let result = null;
      if (isModifyForm) {
        result = await API.put(`${watercraftEndpoints.putWatercraftEndpoint}/${selectedID}`, watercraft);
      } else {
        result = await API.post(watercraftEndpoints.postWatercraftEndpoint, watercraft);
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
  console.log(watercraft);
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
            conformance={Conformance.watercraft.js2html["Registration"](watercraft.Registration)}
            onChange={handleChange}
            errors={errors.Registration}
          />
          <FORM.Select
            htmlFor="Model_ID"
            text="Model"
            list={modelList}
            loadingMessage={loadingModelsMessage}
            name="Model_ID"
            conformance={Conformance.watercraft.js2html["Model_ID"](watercraft.Model_ID)}
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
            conformance={Conformance.watercraft.js2html["Status_ID"](watercraft.Status_ID)}
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
            conformance={Conformance.watercraft.js2html["Boat_Img"](watercraft.Boat_Img)}
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
