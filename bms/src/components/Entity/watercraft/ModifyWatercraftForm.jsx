import { useState, useEffect } from "react";
import API from "../../API/API";
import './WatercraftForm.scss';
import { useNavigate, useLocation} from "react-router-dom";
import isURL from 'is-url';
import useLoad from "../../API/useLoad.jsx";
import Action from "../../UI/Actions";

let initialWatercraft = 
    {
        Boat_Img: null,
        Registration: null,
        Model_ID: 0,
        Status_ID: 0
    }

function ModifyWatercraftForm() {
    // Initialisation ------------------------------
    const navigate = useNavigate(); //used to navigate to diffent pages
    const {state} = useLocation();
    initialWatercraft = 
    {
        Boat_Img: state.initialWatercraft.Boat_Img,
        Registration: state.initialWatercraft.Registration,
        Model_ID: state.initialWatercraft.Model_ID,
        Status_ID: state.initialWatercraft.Status_ID
    }    
    const selectedID = state.initialWatercraft.Synthetic_Key // needed for put later
    console.log(state.initialWatercraft);
    console.log("The selected ID is " + selectedID);
    

    const conformance ={
        html2js:{
            Boat_Img: (value) => (value=== ''? null: value),
            Registration: (value) => (value=== ''? null: value),
            Model_ID: (value) => (value == 0 ? null : parseInt(value)),
            Status_ID: (value) => (value == 0 ? null : parseInt(value))

        },

        js2html:{
            Boat_Img: (value) => (value=== null? '': value),
            Registration: (value) => (value=== null? '': value),
            Model_ID: (value) => (value === null ? 0 : value),
            Status_ID: (value) => (value === null ? 0 : value)
        },
    }

    const isValid ={
        Boat_Img: (value) => (value===null?true:isURL(value)),
        Registration: (value) => {if (value!==null){return value.length >0 && value.length <100 }else {return false}},
        Model_ID: (value) => (value!=0 || value!='0'),
        Status_ID: (value) => (value!=0 || value!='0')
    }

    const errorMessage ={
        Boat_Img: "Invalid URL",
        Registration: "Invalid Registration Number",
        Model_ID: "No model selected",
        Status_ID: "No Status selected"
    }


    const modelsEndpoint = '/model';
    const putWatercraftEndpoint = '/boats'
    const statusEndpoint = '/status';


    
        //State ---------------------------------------
    const [watercraft, setWatercraft] = useState(initialWatercraft);
    const [modelList, setModelList,loadingModelsMessage,loadModels] = useLoad(modelsEndpoint)
    const [statusList, setStatusList,loadingStatusMessage, loadStatus] = useLoad(statusEndpoint)
    const[ errors, setErrors] = useState (Object.keys(initialWatercraft).reduce((acc, key) =>({...acc,[key]: null}), {}));
    
    

    //Handlers -------------------------------------
    const handleCancel = () => {
        navigate('/watercraft');
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        const conformedValue = conformance.html2js[name](value);
        setWatercraft({...watercraft, [name]: conformedValue});
        setErrors({...errors,[name]: isValid[name](conformedValue) ? null: errorMessage[name]});
    };

    useEffect(() => {setErrors(errors)},[errors]); // I NEED THIS == without it all the error message are one step behind 

    const isValidWatercraft =(watercraft) => {
        var isWatercraftValid = true;
        Object.keys(watercraft).forEach((key) => { 
            console.log("Key " + key)// we do this becasue setErrors is asychronous thus we cannot determine its stte when we need to go through it
            if(isValid[key](watercraft[key])){
                errors[key] = null;
            }else {
                errors[key] = errorMessage[key]
                isWatercraftValid = false;
            }
        });
        return isWatercraftValid;
    }

    const handleSubmit = async () => {
        //console.log(`watercraft=[${JSON.stringify(watercraft)}]`);
        const check = isValidWatercraft(watercraft);
        setErrors({...errors});
        if(check)
        {
            const result = await API.put(`${putWatercraftEndpoint}/${selectedID}`, watercraft);
            console.log(result);
            if(result.isSuccess) 
            {
                navigate('/watercraft');

            }
            else{
                
                alert(`Modify NOT Successful: ${result.message}`);
            }
        }
    };


    //View -----------------------------------------
    return (
        <>
            <h1 id="title">Editing Watercraft</h1>
            <div className="watercraftForm">
                    <div className="formTray">
                        <label htmlFor="Registration"> Registration
                            <input 
                            type="text" 
                            name="Registration" 
                            value= {conformance.js2html["Registration"](watercraft.Registration)}
                            onChange={handleChange}
                            />
                            <span className="error">{errors.Registration}</span>
                        </label>

                        <label htmlFor="Model_ID"> Model
                            {!modelList
                            ?<p>loadingModelsMessage</p>
                            :(
                                <select name="Model_ID" value={conformance.js2html["Model_ID"](watercraft.Model_ID)} onChange={handleChange}>
                                <option selected={true} value='0' disabled>None Selected</option>
                                {
                                    modelList.sort((a, b) => a.Model_Name.localeCompare(b.Model_Name))   ///sort by Model_Name
                                    .map((model) => <option key={model.Model_ID} value={model.Model_ID}>{model.Model_Name}</option>)
                                }
                                </select>
                            )}
                                <span className="error">{errors.Model_ID}</span>  
                        </label>

                        <label htmlFor="Status"> Status
                        {!statusList
                            ?<p>loadingModelsMessage</p>
                            :(
                            <select name="Status_ID" value={conformance.js2html["Status_ID"](watercraft.Status_ID)} onChange={handleChange}> 
                                <option selected={true} value='0' disabled>None Selected</option> 
                                {
                                    statusList.map((status) => <option key={status.Status_ID} value={status.Status_ID}>{status.Status}</option>)
                                }     
                            </select>
                            )}
                            <span className="error">{errors.Status_ID}</span>
                        </label>

                        <label htmlFor="Boat_Img"> Image URL
                            <input 
                            type="text" 
                            name="Boat_Img" value={conformance.js2html["Boat_Img"](watercraft.Boat_Img)} 
                            onChange={handleChange}
                            />
                            <span className="error">{errors.Boat_Img}</span>
                        </label>
                    </div>

                      <Action.Tray>
                        <Action.Cancel buttonText="Cancel" showText={true} onClick={handleCancel}></Action.Cancel>
                        <Action.Submit buttonText="Submit" showText={true} onClick={handleSubmit}></Action.Submit>
                      </Action.Tray>
                        
                    
            </div>
       </>
    );
    

}

export default ModifyWatercraftForm;
