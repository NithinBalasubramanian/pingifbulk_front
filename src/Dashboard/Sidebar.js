/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const SideBar = ({ userType, type }) => {
  const menuItems = [
    {
      name: 'User Management',
      key: 'user_management',
      path: '/user-management',
      displayState: userType && type
    },
    {
      name: 'Consumer Management',
      key: 'consumer_management',
      path: '/consumer-management',
      displayState: userType
    },
    {
      name: 'Employee Management',
      key: 'employee_management',
      path: '/employee-management',
      displayState: true
    },
    {
      name: 'Team Management',
      key: 'team_management',
      path: '/team-management',
      displayState: true
    },
    {
      name: 'Single Mailer',
      key: 'mailer',
      path: '/single-mailer',
      displayState: true
    },
    {
      name: 'Bulk Mailer',
      key: 'mailer',
      path: '/bulk-mailer',
      displayState: true
    },
    {
      name: 'Mailer',
      key: 'mailer',
      path: '/mailer',
      displayState: true
    }
  ]

  const generalMenuItems = [
    {
      name: 'User Types',
      key: 'user_types',
      path: '/user-type-management',
      displayState: userType
    },
    {
      name: 'Consumer Types',
      key: 'consumer_types',
      path: '/consumer-type-management',
      displayState: true
    },
    {
      name: 'Employee Types',
      key: 'employee_types',
      path: '/employee-type-management',
      displayState: true
    },
    {
      name: 'Team Types',
      key: 'team_types',
      path: '/team-type-management',
      displayState: true
    }
  ]
  // eslint-disable-next-line no-unused-vars
  const [menuList, setMenuList] = useState(menuItems)

  return (
        <div className="sidebarMain">
            {menuList.length > 0 && menuItems.map((itm, k) => {
              if (itm.displayState) {
                return (
                      <Link key={k} to={itm.path}>
                          <div className="sideBarMenu">
                              {itm.name}
                          </div>
                      </Link>
                )
              }
            })}
            <p className='settings'>App Settings</p>
            {generalMenuItems.length > 0 && generalMenuItems.map((itm, k) => {
              if (itm.displayState) {
                return (
                      <Link key={k} to={itm.path}>
                          <div className="sideBarMenu">
                              {itm.name}
                          </div>
                      </Link>
                )
              }
            })}
        </div>
  )
}

export default SideBar
