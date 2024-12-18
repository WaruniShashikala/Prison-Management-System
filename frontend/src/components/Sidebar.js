import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import prisonDepartmentLogo from '../img/prison_logo.png';

function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();
  const [inmatesColor, setInmatesColor] = useState("#000000"); 

  const handleMenuClick = (key) => {
    navigate(key);
    if (key.startsWith("/current")) {
        setInmatesColor("#ffffff"); 
    } 
    else if (key.startsWith("/released")) { 
        setInmatesColor("#ffffff"); 
    } 
    else if (key.startsWith("/wanted")) {  
        setInmatesColor("#ffffff");
    } else {
        setInmatesColor("#000000");
    }
  };

  return (

    <div className="sidebar">
    <div className="dashboard-header">
      <img className="prison-logo" src={prisonDepartmentLogo} alt="Prison Department Logo"/>
      <div className="topic">Sri Lanka Prison Department</div>
    </div>
    <hr className="divider" />
    <Menu
      mode="vertical"
      onClick={({ key }) => handleMenuClick(key)}
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "#4682B4" }}
    >
      <Menu.Item className="mainMenu" key="/mainsecurity">Security Resources</Menu.Item>
      <Menu.Item className="mainMenu" key="/maintransport">Transportation Resources</Menu.Item>
      <Menu.Item className="mainMenu" key="/mainmedical">Medical Resources</Menu.Item>
    </Menu>


    </div>

  );
}

export default Sidebar;
