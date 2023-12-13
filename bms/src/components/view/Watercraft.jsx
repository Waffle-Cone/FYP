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
    const deleteWatercraftEndpoint = '/boats'

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
    
    const handleDelete = async ()=> {
        console.log('Delete Watercraft' + toDelete.Synthetic_Key);
        const selectedID = toDelete.Synthetic_Key

        console.log(" Watercraft: Deleted Watercraft")
            const result = await API.delete(`${deleteWatercraftEndpoint}/${selectedID}`);
            console.log(result);
            setShowModal(false)    
            if(result.isSuccess == false) 
            {
                alert(`Delete NOT Successful: ${result.message}`)
            }
            loadWatercrafts(endPoint)
    };
    
    //View ----------------------------------------------------------------

    return(
        <>
        {
            !showModal
            ?null
            :MODAL.DeleteConfirm(showModal,handleModalClose,toDelete,handleDelete)
            
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