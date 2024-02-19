import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/view/Home.jsx";
import Login from "./components/view/Login.jsx";
import PageNotFound from "./components/view/PageNotFound.jsx";
import WaterCraft from "./components/view/Watercraft.jsx";
import WatercraftForm from "./components/entity/watercraft/WatercraftForm.jsx";
import ModifyWatercraftForm from "./components/Entity/watercraft/ModifyWatercraftForm.jsx";
import WatercraftDetails from "./components/Entity/watercraft/WatercraftDetails.jsx";
import Employee from "./components/view/Employee.jsx";

function App() {
  const loggedInUser = "Admin";

  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watercraft" element={<WaterCraft />} />
          <Route path="/addWatercraft" element={<WatercraftForm />} />
          <Route path="/editWatercraft" element={<ModifyWatercraftForm />} />
          <Route path="/watercraftDetails" element={<WatercraftDetails />} />
          <Route path="/staff" element={<Employee />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

//protective routes
export default App;
