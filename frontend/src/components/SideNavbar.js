import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import prisonDepartmentLogo from '../img/prison_logo.png';

function SideNavbar({ userName, profilePicture }) {
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
        <Menu.Item className="mainMenu" key="/dashboard">Inmate Dashboard</Menu.Item>
        <Menu.SubMenu
          className="mainMenu"
          key="inmates"
          title={<span style={{ color: inmatesColor }}>Inmates</span>}
        >
          <Menu.Item className="subMenu" key="/current">Current Inmates</Menu.Item>
          <Menu.Item className="subMenu" key="/released">Released Inmates</Menu.Item>
          <Menu.Item className="subMenu" key="/wanted">Wanted Inmates</Menu.Item>
        </Menu.SubMenu>
        
        <Menu.Item className="mainMenu" key="/appointments">Inmate Medical Appointments</Menu.Item>
        <Menu.Item className="mainMenu" key="/schedule">Inmate Schedule</Menu.Item>
      </Menu>


    </div>
  );
}

export default SideNavbar;
