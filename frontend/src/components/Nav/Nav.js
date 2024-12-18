import React, { useState } from "react";
import { Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import "./nav.css";
import prisonlogo from "../../img/prison_logo6.png"


const { SubMenu } = Menu;

const Nav = () => {
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
    <div className="Tsaksidebar"> 
    <div className="Task-menu-heding">
      <div className="Task-menu-logo">
      <img src={prisonlogo}></img></div>
    <h2 className="Task-h2">Sri Lanka Prison Department</h2>
    </div>
    <hr className="Task-divider"></hr>
      <Menu mode="vertical" onClick={({ key }) => handleMenuClick(key)} selectedKeys={[location.pathname]} style={{ backgroundColor: "#4682B4" }}>
        <Menu.Item key="" className='menuItem'>Maintenance Dashboard</Menu.Item>
        
            <Menu.Item key="/addTask" className="menuItem">
              Add Task
            </Menu.Item>
          <Menu.Item key="/tasks" className='menuItem'>Work Oders</Menu.Item>
          
      </Menu>
    </div>
  )
}

export default Nav;