import React from 'react'
import Sidebar from '../visitor/Sidebar'
import Summary from './Summary'

const Summrychart = () => {
  return (
    <div style={{display: 'flex'}}>
      <div>
        <Sidebar/>
      </div>
      <div>
        <Summary/>
      </div>
    </div>
  )
}

export default Summrychart
