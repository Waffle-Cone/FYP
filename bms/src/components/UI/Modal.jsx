import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap'
import WatercraftCard from '../Entity/watercraft/WatercraftCard';
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
          <Modal show={show} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body> Deleting: {toDelete.Type} with Registration: {toDelete.Registration}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={()=>handleDelete()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

MODAL.useModal = useModal;
MODAL.DeleteConfirm = (show,handleModalClose,toDelete,handleDelete) => DeleteConfirm(show,handleModalClose,toDelete,handleDelete);


export default MODAL;