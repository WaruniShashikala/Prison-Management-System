import React, { useState } from "react";
import { Menu } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import "./SideNavbar.css";
import prisonDepartmentLogo from '../img/prison_logo.png';
import "./StaffMenuBar.css";

function AdminNavbar() {

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
    <div>
      <div className="sidebar"> 
      <div className="dashboard-header">
          <img className="prison-logo" src={prisonDepartmentLogo} alt="Prison Department Logo"/>
          <div className="topic">Sri Lanka Prison Department</div>
        </div>
        <hr className="divider" />
        <Menu mode="vertical" onClick={({ key }) => handleMenuClick(key)} selectedKeys={[location.pathname]} style={{ backgroundColor: "#4683B4" }}>
          <Menu.Item key="/" className='menuItem'>Home</Menu.Item>
          <Menu.Item key="/staff" className='menuItem' style={{ color: staffColor }}>Staff Management</Menu.Item>
          <Menu.Item key="/dashboard" className='menuItem'>Inmate Management</Menu.Item>
          <Menu.Item key="/rehabilitationDashboard" className='menuItem'>Rehabilitation and Education Management</Menu.Item>
          <Menu.Item key="/mainsecurity" className='menuItem'>Resources Management</Menu.Item>
          <Menu.Item key="/visitorDashboard" className='menuItem'>Visitor Management</Menu.Item>
          <Menu.Item key="/healthcareDashboard" className='menuItem'>Healthcare Management</Menu.Item>
          <Menu.Item key="/securityStaffDashboard" className='menuItem'>Security Management</Menu.Item>
          <Menu.Item key="" className='menuItem'>Maintenance Management</Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AdminNavbar;
