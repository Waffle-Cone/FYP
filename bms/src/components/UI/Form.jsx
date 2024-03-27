import Action from "./Actions";
import PropTypes from "prop-types";
import "./Form.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FORM = {};

const FormContainer = (props) => {
  return (
    <div className="formLayout">
      <div className="formContainer">{props.children}</div>;
    </div>
  );
};

const dateContainer = (props) => {
  return <div className="dateContainer">{props.children}</div>;
};

const FormTray = (props) => {
  return <div className="formTray"> {props.children}</div>;
};

const Input = ({ htmlFor, text, type, FieldName, conformance, onChange, errors }) => {
  return (
    <label htmlFor={htmlFor}>
      {text}
      <input type={type} name={FieldName} value={conformance} onChange={onChange} />
      <span className="error">{errors}</span>
    </label>
  );
};

Input.prototypes = {
  htmlFor: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  FieldName: PropTypes.string.isRequired,
  conformance: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Select = ({ htmlFor, text, list, loadingMessage, name, conformance, onChange, listKey, listValue, listText, errors }) => {
  return (
    <label htmlFor={htmlFor}>
      {text}
      {!list ? (
        <p>{loadingMessage}</p>
      ) : (
        <select name={name} value={conformance} onChange={onChange}>
          <option value="0" disabled>
            None Selected
          </option>
          {list.map((x) => (
            <option key={x[listKey]} value={x[listValue]}>
              {x[listText]}
            </option>
          ))}
        </select>
      )}
      <span className="error">{errors}</span>
    </label>
  );
};

const MyDatePicker = ({ selected, onChange }) => {
  return <DatePicker selected={selected} onChange={(date) => onChange(date)} showIcon={true} className="datePicker" />;
};

FORM.Container = FormContainer;
FORM.DateContainer = dateContainer;
FORM.Tray = FormTray;
FORM.Input = Input;
FORM.Select = Select;
FORM.Date = MyDatePicker;
export default FORM;
