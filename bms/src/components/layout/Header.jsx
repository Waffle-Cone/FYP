import { useEffect, useState } from "react";
import { useAuth } from "../auth/context/AuthContext";
import "./header.scss";

function Header(props) {
  const { user } = useAuth();

  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user !== null) {
      setUsername(user.name);
    } else {
      setUsername(null);
    }
  }, [user]);

  return (
    <header>
      <h1>Charter Managment</h1>
      <p className="welcome">Welcome {username}</p>
    </header>
  );
}
export default Header;
