import "./WatercraftCard.scss"

function WatercraftCard ({watercraft}){
    // Initialisation ------------------------------------------------------
    // State ---------------------------------------------------------------
    // View ----------------------------------------------------------------
    return (
        <div className="WatercraftCard" >
                <img src={watercraft.Img_URL} />
                <p>{watercraft.Registration_Number}</p>
                <p>{watercraft.Model_Name}</p>
                <p>{watercraft.Type}</p>
                <p>{watercraft.Status}</p>
                
        </div>  

    );
}

export default  WatercraftCard;