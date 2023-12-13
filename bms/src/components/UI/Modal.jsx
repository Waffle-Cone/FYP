import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap'
import './Modal.scss'

const MODAL = {};

const useModal  =() => {
    const [showModal, setShowModal] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);
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
            <div className='modal-content'>
                <div className='modal-container'>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body > Deleting: {toDelete.Type} with Registration: {toDelete.Registration}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={()=>handleDelete()}>
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