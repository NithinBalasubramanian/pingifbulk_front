import React from 'react'
import './index.scss'

const Dashboard = () => {
  const userName = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")).userName : "Pingifbulk"
  return (
        <div className="dashBoard">
          {userName} - Dashboard
        </div>
  )
}

export default Dashboard
