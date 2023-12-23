import { useState, useEffect } from 'react';
import API from '../API/API.jsx';
import WatercraftCard from '../Entity/watercraft/WatercraftCard.jsx';
import { CardContainer } from '../UI/Card.jsx';
import { useNavigate } from 'react-router-dom';
import MODAL from '../UI/Modal.jsx';
import useLoad from '../API/useLoad.jsx';
import Action from '../UI/Actions.jsx';

function WaterCraft(){
   
    //Initialisation ------------------------------------------------------
    const navigate = useNavigate();
    const endPoint = `/boats`;
    const deleteWatercraftEndpoint = '/boats'

    //state  --------------------------------------------------------------
    const [ watercrafts, setWatercrafts, loadingMessage, loadWatercrafts ] = useLoad(endPoint)
    const [ showModal,setShowModal, handleModalClose, handleModalShow,toDelete,setToDelete ] = MODAL.useModal();
    const [editMode,setEditMode] = useState(false);
    //Handlers ------------------------------------------------------------
    const showEditMode = ()=>{
        setEditMode(true);
    }
    const hideEditMode = ()=>{
        setEditMode(false);
    }
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
        {
            !editMode
            ?
                <Action.Tray> 
                    <Action.Add buttonText="Add" showText={true} onClick={showForm}></Action.Add>
                    <Action.Modify buttonText="Edit" showText={true} onClick={showEditMode}></Action.Modify>
                </Action.Tray>
            :<Action.Tray>
                 <Action.Cancel buttonText="Cancel" showText={true} onClick={hideEditMode}></Action.Cancel>
             </Action.Tray>
           
        }
       
        {
            !watercrafts
            ?<p>{loadingMessage}</p>
            :watercrafts.length === 0
                ?<p> Add your first watercraft </p>
                : (
                    <>
                        <CardContainer>
                            {watercrafts.map((watercraft) => <WatercraftCard editMode = {editMode} openModal = {openModal} watercraft={watercraft} key={watercraft.Synthetic_Key}/> )}
                        </CardContainer>
                    </>
                )}
        </>
    );
};

export default WaterCraft;