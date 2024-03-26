const SetInitial = {};

const watercraft = (initialWatercraft, state) => {
  let isModifyForm = false;
  let selectedID = null;
  let title = "Add Watercraft to Fleet";

  if (state) {
    isModifyForm = true;
    selectedID = state.initialWatercraft.Synthetic_Key; // needed for put later
    console.log("The selected ID is " + selectedID);
    title = "Modify Watercraft";
    initialWatercraft.Boat_Img = state.initialWatercraft.Boat_Img;
    initialWatercraft.Registration = state.initialWatercraft.Registration;
    initialWatercraft.Model_ID = state.initialWatercraft.Model_ID;
    initialWatercraft.Status_ID = state.initialWatercraft.Status_ID;
  } else {
    initialWatercraft.Boat_Img = null;
    initialWatercraft.Registration = null;
    initialWatercraft.Model_ID = 0;
    initialWatercraft.Status_ID = 0;
  }

  return [initialWatercraft, selectedID, title, isModifyForm];
};

const employee = (initialEmployee, state) => {
  let isModifyForm = false;
  let selectedEmployeeID = null;
  let title = "Add Employee";

  if (state) {
    isModifyForm = true;
    selectedEmployeeID = state.initialEmployee.Employee_ID;
    title = "Modify Employee";
    console.log(selectedEmployeeID);

    //set up the initialEmployee object
    initialEmployee.Employee_Name = state.initialEmployee.Employee_Name;
    initialEmployee.Job_ID = state.initialEmployee.Job_ID;
    initialEmployee.Start_Date = state.initialEmployee.Start_Date;
    initialEmployee.Employee_Img = state.initialEmployee.Employee_Img;
  } else {
    initialEmployee.Employee_Name = null;
    initialEmployee.Job_ID = 0;
    initialEmployee.Start_Date = null;
    initialEmployee.Employee_Img = null;
  }

  return [initialEmployee, selectedEmployeeID, title, isModifyForm];
};

SetInitial.employee = (initialEmployee, state) => employee(initialEmployee, state);
SetInitial.watercraft = (initialWatercraft, state) => watercraft(initialWatercraft, state);
export default SetInitial;
