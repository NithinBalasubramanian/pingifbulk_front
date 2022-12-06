import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const SideBar = () => {
  const menuItems = [
    {
      name: 'User Management',
      key: 'user_management',
      path: '/user-management'
    },
    {
      name: 'Consumer Management',
      key: 'consumer_management',
      path: '/consumer-management'
    },
    {
      name: 'Team Management',
      key: 'team_management',
      path: '/team-management'
    },
    {
      name: 'Mailer',
      key: 'mailer',
      path: '/single-mailer'
    }
  ]

  const generalMenuItems = [
    {
      name: 'User Types',
      key: 'user_types',
      path: '/user-type-management'
    },
    {
      name: 'Consumer Types',
      key: 'consumer_types',
      path: '/consumer-type-management'
    },
    {
      name: 'Team Types',
      key: 'team_types',
      path: '/team-type-management'
    }
  ]
  // eslint-disable-next-line no-unused-vars
  const [menuList, setMenuList] = useState(menuItems)

  return (
        <div className="sidebarMain">
            {menuList.length > 0 && menuItems.map((itm, k) => {
              return (
                    <Link key={k} to={itm.path}>
                        <div className="sideBarMenu">
                            {itm.name}
                        </div>
                    </Link>
              )
            })}
            <p className='settings'>App Settings</p>
            {generalMenuItems.length > 0 && generalMenuItems.map((itm, k) => {
              return (
                    <Link key={k} to={itm.path}>
                        <div className="sideBarMenu">
                            {itm.name}
                        </div>
                    </Link>
              )
            })}
        </div>
  )
}

export default SideBar
