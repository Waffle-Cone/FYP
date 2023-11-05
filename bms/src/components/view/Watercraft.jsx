import { useState, useEffect } from 'react';
import API from '../API/API.jsx';
import WatercraftCard from '../Entity/watercraft/WatercraftCard.jsx';
import { CardContainer } from '../UI/Card.jsx';

function WaterCraft(){
   
    //Initialisation ------------------------------------------------------
    const endPoint = `/boats`;

    //state  --------------------------------------------------------------
    const [watercrafts, setWatercrafts] = useState(null);
    const[loadingMessage, setLoadingMessage] = useState("Loading records...");

    const apiGet = async(endPoint) => {
        const response = await API.get(endPoint);
        response.isSuccess
        ? setWatercrafts(response.result)
        : setLoadingMessage(response.message)
    };

    useEffect(() => {apiGet(endPoint)},[endPoint]);
 
    //Handlers ------------------------------------------------------------
    //View ----------------------------------------------------------------

    return(
        <>
        {
            !watercrafts
            ?<p>{loadingMessage}</p>
            :watercrafts.length === 0
                ?<p> Add your first watercraft </p>
                : (
                    <>
                        <CardContainer>
                            {watercrafts.map((watercraft) => <WatercraftCard watercraft={watercraft} key={watercraft.Registration_Number}/> )}
                        </CardContainer>
                    </>
                )}
        </>
    );
};

export default WaterCraft;