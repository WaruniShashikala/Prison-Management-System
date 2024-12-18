import React from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const VisitorDashboard = () => {
  return (
    <div style={{width:"100%"}}>
        <div style={{display: "flex", width:"100%" }}>
            <Sidebar/>
            <div >
                <TopBar/>
            </div>
        </div>
    </div>
  )
}

export default VisitorDashboard