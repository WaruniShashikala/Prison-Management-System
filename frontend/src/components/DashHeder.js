import React from 'react'
import { Link } from 'react-router-dom'
const DashHeder = () => {
  const content =(
    <header className='dash-header'>
        <div className='dash-header_container'>
            <Link to="/dash">
                <h1 className='dash-header-title'>Prison management app</h1>
            </Link>
            <nav className='dash-header_nav'>
                {/**/ }
            </nav>
        </div>
    </header>
  )
  return content
}

export default DashHeder
