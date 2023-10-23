import { Card } from "../UI/Card";
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

export default  WatercraftCard;