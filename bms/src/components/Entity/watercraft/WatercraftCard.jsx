import PropTypes from 'prop-types';
import { Card } from "../../UI/Card";
import "./WatercraftCard.scss"
import { useNavigate } from 'react-router-dom';
import MODAL from '../../UI/Modal';
import WaterCraft from '../../view/Watercraft';
import API from '../../API/API';


function WatercraftCard ({watercraft, openModal}){
    // Initialisation ------------------------------------------------------
    const navigate = useNavigate();
    const deleteWatercraftEndpoint = '/boats'

    
    // State ---------------------------------------------------------------
    //Handlers
    const handleEdit = ()=> {
        navigate('/editWatercraft', {state: {initialWatercraft: watercraft}});
    }
    const handleDelete = async ()=> {
        console.log('Delete Watercraft' + watercraft.Synthetic_Key);
        const selectedID = watercraft.Synthetic_Key

        console.log(" Watercraftcard: Deleted Watercraft")
        

            /*const result = await API.delete(`${deleteWatercraftEndpoint}/${selectedID}`);
            console.log(result);
            if(result.isSuccess == false) alert(`Delete NOT Successful: ${result.message}`);*/
    };
    // View ----------------------------------------------------------------
    return (
                <div className="watercraftCard" >
                    <Card> 
                        {
                            !watercraft.Boat_Img  // If a custom boat image is specified use it. I f not use the default model one
                            ?<img src={watercraft.Img_URL}/>
                            :<img src={watercraft.Boat_Img}/>
                        }
                        <p>{watercraft.Registration}</p>
                        <p>{watercraft.Model_Name}</p>
                        <p>{watercraft.Type}</p>
                        <p>{watercraft.Status}</p>

                        <div className="buttonTray">    
                            <button onClick={handleEdit}>Edit</button> 
                            <button onClick={()=> openModal(watercraft)}>Delete</button>
                        </div>    
                    </Card> 
                
                </div>
    );
}

WatercraftCard.propTypes = {
    watercraft: PropTypes.shape({
        Img_URL: PropTypes.string,
        Boat_Img: PropTypes.string,
        Registration: PropTypes.string.isRequired,
        Model_Name: PropTypes.string.isRequired,
        Type: PropTypes.string.isRequired,
        Status: PropTypes.string.isRequired,

    })
};

export default  WatercraftCard;