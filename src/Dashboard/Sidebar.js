import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const SideBar = () => {
  const menuItems = [
    {
      name: 'Category',
      key: 'category_management',
      path: '/category-management'
    },
    {
      name: 'Customer Management',
      key: 'customer_management',
      path: '/customer-management'
    },
    {
      name: 'Mailer',
      key: 'mailer',
      path: '/single-mailer'
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
        </div>
  )
}

export default SideBar
