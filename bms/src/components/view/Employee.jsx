import { useState, useEffect } from "react";
import API from "../API/API.jsx";
import EmployeeCard from "../Entity/employee/EmployeeCard.jsx";
import { CardContainer } from "../UI/Card.jsx";
import { useNavigate } from "react-router-dom";
import MODAL from "../UI/Modal.jsx";
import useLoad from "../API/useLoad.jsx";
import Action from "../UI/Actions.jsx";

function Employee() {
  //Initialisation ------------------------------------------------------
  const navigate = useNavigate();
  const endPoint = `/employees`;
  const deleteEmployeeEndpoint = "/employees";

  //state  --------------------------------------------------------------
  const [employees, setEmployees, loadingMessage, loadEmployees] = useLoad(endPoint);
  const [showModal, setShowModal, handleModalClose, handleModalShow, toDelete, setToDelete] = MODAL.useModal();
  const [editMode, setEditMode] = useState(false);
  //Handlers ------------------------------------------------------------
  const showEditMode = () => {
    setEditMode(true);
  };
  const hideEditMode = () => {
    setEditMode(false);
  };
  const showForm = () => {
    navigate("/addEmployee");
  };

  const openModal = (selectedEmployee) => {
    setShowModal(true);
    setToDelete(selectedEmployee);
  };

  const handleDelete = async () => {
    console.log("Delete Employee" + toDelete.Employee_Name);
    const selectedID = toDelete.Employee_ID;

    const result = await API.delete(`${deleteEmployeeEndpoint}/${selectedID}`);
    console.log(result);
    setShowModal(false);
    if (result.isSuccess == false) {
      alert(`Delete NOT Successful: ${result.message}`);
    }
    loadEmployees(endPoint);
  };

  //View ----------------------------------------------------------------

  return (
    <>
      {!showModal ? null : MODAL.DeleteConfirm(showModal, handleModalClose, toDelete, handleDelete)}
      {!editMode ? (
        <Action.Tray>
          <Action.Add buttonText="Add" showText={true} onClick={showForm}></Action.Add>
          <Action.Modify buttonText="Edit" showText={true} onClick={showEditMode}></Action.Modify>
        </Action.Tray>
      ) : (
        <Action.Tray>
          <Action.Cancel buttonText="Cancel" showText={true} onClick={hideEditMode}></Action.Cancel>
        </Action.Tray>
      )}

      {!employees ? (
        <p>{loadingMessage}</p>
      ) : employees.length === 0 ? (
        <p> Add your first employee </p>
      ) : (
        <>
          <CardContainer>
            {employees.map((employee) => (
              <EmployeeCard editMode={editMode} openModal={openModal} employee={employee} key={employee.Employee_ID} />
            ))}
          </CardContainer>
        </>
      )}
    </>
  );
}

export default Employee;
