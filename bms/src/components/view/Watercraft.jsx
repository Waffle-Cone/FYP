import { useState, useEffect } from 'react';
import WatercraftCard from '../Entity/WatercraftCard.jsx';

function WaterCraft(){
   
    //Initialisation ------------------------------------------------------

    const apiURL =  `http://localhost:5000/api`;
    const endpoint = `/boats`;
    const apiEndpoint = `${apiURL}${endpoint}`;
    console.log(apiEndpoint);


    //state  --------------------------------------------------------------
    const [watercrafts, setWatercrafts] = useState(null);
    const[loadingMessage, setLoadingMessage] = useState("Loading records...");

    const apiGet = async(apiEndpoint) => {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        setWatercrafts(result);
    };

    useEffect(() => {apiGet(apiEndpoint)},[apiEndpoint]);
    console.log(watercrafts);


    //Handlers ------------------------------------------------------------
    //View ----------------------------------------------------------------

    return(
        <>
        {
            !watercrafts
            ?<p>{loadingMessage}</p>
            :watercrafts.length === 0
                ?<p> Add your first watercraft </p>
                : watercrafts.map((watercraft) => <WatercraftCard watercraft={watercraft} key={watercraft.Registration_Number}/> )
        }
        </>
    );
};

export default WaterCraft;