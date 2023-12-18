import PropTypes from 'prop-types';
import { Card } from "../../UI/Card";
import "./WatercraftCard.scss"
import { useNavigate } from 'react-router-dom';
import Action from '../../UI/Actions';



function WatercraftCard ({watercraft, openModal, editMode}){
    // Initialisation ------------------------------------------------------
    const navigate = useNavigate();
    // State ---------------------------------------------------------------
    //Handlers
    const handleEdit = ()=> {
        navigate('/editWatercraft', {state: {initialWatercraft: watercraft}});
    }

    
    // View ----------------------------------------------------------------
    return (
                <div className="watercraftCard" >
                    <Card watercraft={watercraft} openModal={openModal} editMode={editMode} handleEdit={handleEdit}> 
                        {
                            !watercraft.Boat_Img  // If a custom boat image is specified use it. I f not use the default model one
                            ?<img src={watercraft.Img_URL}/>
                            :<img src={watercraft.Boat_Img}/>
                        }
                        <p>{watercraft.Registration}</p>
                        <p>{watercraft.Model_Name}</p>
                        <p>{watercraft.Type}</p>
                        <p>{watercraft.Status}</p>     
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