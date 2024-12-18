import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeder from './DashHeder'
import DashFooter from './DashFooter'

const DashLayout = () => {
  return (
    <>
    <DashHeder/>
    <div className='dash-container'>
        <Outlet/>
    </div>
    <DashFooter/>
    </>
  )
}

export default DashLayout
