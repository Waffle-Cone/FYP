import PropTypes from 'prop-types';
import { Card } from "../../UI/Card";
import "./WatercraftCard.scss"
import { useNavigate } from 'react-router-dom';



function WatercraftCard ({watercraft, openModal, editMode}){
    // Initialisation ------------------------------------------------------
    const navigate = useNavigate();
    // State ---------------------------------------------------------------
    //Handlers
    const handleEdit = ()=> {
        navigate('/editWatercraft', {state: {initialWatercraft: watercraft}});
    }
    let displayButtons = "buttonTrayOFF";

    if(editMode)
    {
        displayButtons= "buttonTrayON";
    }
    
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
                        {
                            !editMode
                            ?  null
                            :<div className= {displayButtons}>    
                            <button onClick={handleEdit}>Edit</button> 
                            <button onClick={()=> openModal(watercraft)}>Delete</button>
                            </div>
                             
                              
                        }
                        
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