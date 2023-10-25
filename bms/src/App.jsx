import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import Home from './components/view/Home.jsx';
import Login from './components/view/Login.jsx';
import PageNotFound from './components/view/PageNotFound.jsx';
import WaterCraft from './components/view/Watercraft.jsx';

function App() {
  const loggedInUser = "Admin";

  return (
    <BrowserRouter>
      <Layout loggedInUser={loggedInUser}>
        <Routes>
          <Route path="/Home" element= {<Home/>}/>
          <Route path="/login" element= {<Login/>}/>  
          <Route path="/" element= {<WaterCraft/>}/>
          <Route path="/*"element={<PageNotFound />}/>
        </Routes>    
      </Layout>
    </BrowserRouter>
   
  )
}

export default App
