import "./header.scss";

function Header(props) {
  return (
    <header>
      <h1>Charter Managment</h1>
      <p className="welcome">Welcome {props.loggedInUser}</p>
    </header>
  );
}
export default Header;
