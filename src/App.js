import { useRoutes } from "react-router-dom";
import NavbarSite from "./component/Header/NavbarSite";
import SideBar from "./component/SideBar/SideBar";
import routes from "./routes"
import "./App.css"
import "./MediaQuery.css"
import { useState } from "react";

function App() {

  let router = useRoutes(routes)
  let [isToggle, setIsToggle] = useState(false)

  const openMenuHandler = () => {
    setIsToggle(!isToggle)
  }

  const handleLinkClick = () => {
    setIsToggle(false);
  };


  return (
    <>
        <NavbarSite toggleMenu={openMenuHandler} navIcon={isToggle} />
        
        <div className="wrapper">
          <SideBar openSideBar={isToggle} closeMenu={handleLinkClick} />
          {router}
        </div>

    </>
  );
}

export default App;