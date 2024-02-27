import { useState, useEffect } from "react";
import API from "../API/API.jsx";
import EmployeeCard from "../Entity/employee/EmployeeCard.jsx";
import { CardContainer } from "../UI/Card.jsx";
import { useNavigate } from "react-router-dom";
import MODAL from "../UI/Modal.jsx";
import useLoad from "../API/useLoad.jsx";
import Action from "../UI/Actions.jsx";
import ListBar from "../UI/ListBar.jsx";

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
    navigate("/addStaff");
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
      {!showModal ? null : MODAL.DeleteConfirm(showModal, handleModalClose, toDelete, handleDelete, "employee")}

      <ListBar editMode={editMode} showForm={showForm} showEditMode={showEditMode} hideEditMode={hideEditMode} />

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
