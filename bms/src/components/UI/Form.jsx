import Action from "./Actions";
import PropTypes from 'prop-types';
import "./Form.scss";

const FORM = {};

const FormContainer =(props) =>{
    //Initialisation ------------------------------------------------------
    //state  --------------------------------------------------------------
    //Handlers ------------------------------------------------------------
    //View ----------------------------------------------------------------
    return(<div className='formContainer'> {props.children}</div>);
};

const FormTray= (props)=>{
    return(<div className='formTray'> {props.children}</div>);
};

const Input = ({htmlFor,text,type,FieldName,conformance,onChange,errors})=>{
    return(
            <label htmlFor={htmlFor}> {text}
                <input 
                type= {type} 
                name= {FieldName}
                value= {conformance}
                onChange={onChange}
                />
                <span className="error">{errors}</span>
            </label>
    );
}

Input.prototypes ={
    htmlFor: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    FieldName: PropTypes.string.isRequired,
    conformance: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};


const Select = ({htmlFor,text,list,loadingMessage, name, conformance,onChange,listKey,listValue,listText,errors})=>{
    return(
        <label htmlFor={htmlFor}> {text}
            {!list
                ?<p>{loadingMessage}</p>
                :(
                <select 
                name={name} 
                value={conformance} 
                onChange={onChange}> 
                    <option selected={true} value='0' disabled>None Selected</option> 
                    {
                        list.map((x) => <option key={x[listKey]} value={x[listValue]}>{x[listText]}</option>)
                    }     
                </select>
                )}
        <span className="error">{errors}</span>
        </label>
    )
}

FORM.Container = FormContainer;
FORM.Tray = FormTray;
FORM.Input = Input;
FORM.Select = Select;
export default FORM;