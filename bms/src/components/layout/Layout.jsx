import Header from "./Header.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.scss";
import { useAuth } from "../auth/context/AuthContext.jsx";

function Layout({ children, userType }) {
  return (
    <div className="layout">
      <Header />
      <Navbar userType={userType} />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
