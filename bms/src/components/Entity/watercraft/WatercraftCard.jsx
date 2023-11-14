import PropTypes from 'prop-types';
import { Card } from "../../UI/Card";
import "./WatercraftCard.scss"

function WatercraftCard ({watercraft}){
    // Initialisation ------------------------------------------------------
    // State ---------------------------------------------------------------
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