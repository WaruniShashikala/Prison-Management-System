import React, { useState } from "react";
import { Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import "./StaffMenuBar.css";
import prisonlogo from "../img/prison_logo6.png"


const { SubMenu } = Menu;

const StaffMenuBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [staffColor, setStaffColor] = useState("#000000");
  
  const handleMenuClick = (key) => {
    navigate(key);
    if (key.startsWith("/jailor")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/doctor")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/stock_keeper")) {
      setStaffColor("#ffffff");
    }
    else if (key.startsWith("/rehabilitation_officer")) {
      setStaffColor("#ffffff");
    } else {
      setStaffColor("#000000");
    }
  };

  return (
    <div className="Staffsidebar"> 
    <div className="staff-menu-heding">
      <div className="staff-menu-logo">
    <img src={prisonlogo}></img></div>
    <h2 className="staff-h2">Sri Lanka Prison Department</h2>
    </div>
    <hr className="staff-divider"></hr>
      <Menu mode="vertical" onClick={({ key }) => handleMenuClick(key)} selectedKeys={[location.pathname]} style={{ backgroundColor: "#4682B4" }}>
        <Menu.Item key="/staff" className='menuItem'>Staff Dashboard</Menu.Item>
        
            <Menu.Item key="/JailorList" className="menuItem">
              All Jailors
            </Menu.Item>
          <Menu.Item key="/DoctorList" className='menuItem'>All Doctors</Menu.Item>
          
      </Menu>
    </div>
  )
}

export default StaffMenuBar;
