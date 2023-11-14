import { useState, useEffect } from 'react';
import API from '../API/API.jsx';
import WatercraftCard from '../Entity/watercraft/WatercraftCard.jsx';
import { CardContainer } from '../UI/Card.jsx';
import { useNavigate } from 'react-router-dom';

function WaterCraft(){
   
    //Initialisation ------------------------------------------------------
    const navigate = useNavigate();
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
    const showForm = () => {
        navigate('/addWatercraft');
    };
    const handleCancel = () => navigate('/watercraft');
    const handleSuccess = async() => {
        
    }

    //View ----------------------------------------------------------------

    return(
        <>
        <button onClick={showForm} onSuccess={handleSuccess}>Add Watercraft</button>
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