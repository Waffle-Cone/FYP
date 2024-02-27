import Action from "./Actions";

const ListBar = ({ editMode, showForm, showEditMode, hideEditMode }) => {
  return (
    <>
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
    </>
  );
};

export default ListBar;
