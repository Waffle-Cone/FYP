import { useState, useEffect } from 'react';
import API from '../API/API.jsx';
import WatercraftCard from '../Entity/watercraft/WatercraftCard.jsx';
import { CardContainer } from '../UI/Card.jsx';
import { useNavigate } from 'react-router-dom';
import MODAL from '../UI/Modal.jsx';
import useLoad from '../API/useLoad.jsx';

function WaterCraft(){
   
    //Initialisation ------------------------------------------------------
    const navigate = useNavigate();
    const endPoint = `/boats`;
    //state  --------------------------------------------------------------
    const [ watercrafts, setWatercrafts, loadingMessage, loadWatercrafts ] = useLoad(endPoint)
    const [ showModal,setShowModal, handleModalClose, handleModalShow,toDelete,setToDelete ] = MODAL.useModal();
    //Handlers ------------------------------------------------------------
    const showForm = () => {
        navigate('/addWatercraft');
    };

    const openModal = (selectedWatercraft) => {
        setShowModal(true);
        setToDelete(selectedWatercraft);
    };
    
    

    
    //View ----------------------------------------------------------------

    return(
        <>
        {
            !showModal
            ?null
            :MODAL.DeleteConfirm(showModal,handleModalClose,toDelete)
            
        }
        <button onClick={showForm} >Add Watercraft</button>
        {
            !watercrafts
            ?<p>{loadingMessage}</p>
            :watercrafts.length === 0
                ?<p> Add your first watercraft </p>
                : (
                    <>
                        <CardContainer>
                            {watercrafts.map((watercraft) => <WatercraftCard openModal = {openModal} watercraft={watercraft} key={watercraft.Synthetic_Key}/> )}
                        </CardContainer>
                    </>
                )}
        </>
    );
};

export default WaterCraft;