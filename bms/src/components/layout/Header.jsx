import "./header.scss";

function Header(props){
    return (
        <header>
        <h1>Boat Management</h1>
        <p className="welcome">Welcome {props.loggedInUser}</p>
      </header>
    );

}
export default Header;