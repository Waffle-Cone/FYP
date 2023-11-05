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
                    <img src={watercraft.Img_URL} />
                    <p>{watercraft.Registration_Number}</p>
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
        Registration_Number: PropTypes.number.isRequired,
        Model_Name: PropTypes.string.isRequired,
        Type: PropTypes.string.isRequired,
        Status: PropTypes.string.isRequired,

    })
};

export default  WatercraftCard;