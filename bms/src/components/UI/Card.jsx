import Action from "./Actions";
import "./Card.scss";

export function CardContainer(props){
    //Initialisation ------------------------------------------------------
    //state  --------------------------------------------------------------
    //Handlers ------------------------------------------------------------
    //View ----------------------------------------------------------------
    return(<div className='cardContainer'> {props.children}</div>);
};

export function Card(props){
    //Initialisation ------------------------------------------------------
    //state  --------------------------------------------------------------
    //Handlers ------------------------------------------------------------
    //View ----------------------------------------------------------------
    return(
        <>
            <div className='card'> 
                {props.children}
                {
                            !props.editMode
                            ? null
                            :<div className="tray">
                            <Action.Tray>
                                <Action.Modify buttonText="Edit" showText={false} onClick={props.handleEdit}></Action.Modify>
                                <Action.Delete buttonText="Delete" showText={false} onClick={()=> props.openModal(props.watercraft)}></Action.Delete>
                            </Action.Tray>
                            </div>
                               
                 }
            </div>
              
        </>
    );
};