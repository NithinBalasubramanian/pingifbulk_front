import React from 'react'
import './index.scss'
import SideBar from './Sidebar'
import MainContent from './MainContent'

const DashboardController = () => {
  return (
        <div className="Dashboard">
            <SideBar />
            <MainContent />
        </div>
  )
}

export default DashboardController
