import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoad from "../API/useLoad";
import { useAuth } from "../auth/context/AuthContext";
import FORM from "../UI/Form";
import Conformance from "../util/Conformance";

const intialAccount = {
  ID: null,
  Password: null,
};

function Login() {
  const navigate = useNavigate(); //used to navigate to diffent pages

  const { handleLogin } = useAuth();
  const [account, setAccount] = useState(intialAccount);
  const [loginError, setLoginError] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const conformedValue = Conformance.login.html2js[name](value);
    setAccount({ ...account, [name]: conformedValue });
  };

  const checkAccount = () => {
    let isLoginReady = true;
    if (account.Username === null || account.Password === null) {
      isLoginReady = false;
    }

    return isLoginReady;
  };

  const accountEnpoint = `/accounts/${account.ID}/${account.Password}`;

  const [theAccount] = useLoad(accountEnpoint);

  const login = () => {
    if (checkAccount()) {
      if (theAccount !== null) {
        const user = { name: theAccount[0].Name, userType: theAccount[0].User_Type, ID: theAccount[0].ID };
        handleLogin(user);
        navigate("/home");
      } else {
        console.log("Login failed after check: user not found");
        setLoginError("Username or Password is invalid");
      }
    } else {
      console.log("Login failed");
      setLoginError("Username or Password is invalid");
    }
  };

  console.log(account);
  // View ----------------------------------------
  return (
    <FORM.Container>
      <FORM.Tray>
        <FORM.Input htmlFor="ID" text="ID " type="text" FieldName="ID" onChange={handleChange} />
        <FORM.Input htmlFor="Password" text="Password " type="text" FieldName="Password" onChange={handleChange} />
        <span style={{ color: "red" }}>{loginError}</span>

        <button onClick={() => login()}>Login</button>
      </FORM.Tray>
    </FORM.Container>
  );
}

export default Login;
