import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap'
import './Modal.scss'

const MODAL = {};

const useModal  =() => {
    const [showModal, setShowModal] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);
    

    return [showModal,setShowModal, handleModalClose, handleModalShow,toDelete,setToDelete];
}

const DeleteConfirm =(show, handleModalClose,toDelete,handleDelete) => {

    return (
        <>
        <Modal 
            show={show} 
            onHide={handleModalClose} 
            backdrop="static"
            keyboard={false}
            className='modal'
        >
            <div className='content'>
                <div className='Container'>
                    <Modal.Header className='header'>
                    <Modal.Title id='title'>Confirm Deletion</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body id='body'> Deleting: {toDelete.Type} with Registration: {toDelete.Registration}</Modal.Body>
                   
                    <Modal.Footer className='footer'>
                    <Button id='btn' variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button id='btn2' variant="primary" onClick={()=>handleDelete()}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </div>
            </div>
        </Modal>
          
        </>
      );
}

MODAL.useModal = useModal;
MODAL.DeleteConfirm = (show,handleModalClose,toDelete,handleDelete) => DeleteConfirm(show,handleModalClose,toDelete,handleDelete);


export default MODAL;