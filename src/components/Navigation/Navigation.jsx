import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './navigation.module.css'
const Navigation = ({ links }) => {
  const location = useLocation()
  const [current, setCurrent] = useState(location.pathname || '/login')

  const onClick = (e) => {
    setCurrent(e.key)
  }
  const items = links.filter(link => link.isVisible)
    .map((link) => {
      return {
        label: (
          <NavLink to={link.link} className={({ isActive }) => 
            isActive ? styles.active : ''
          }>
            {link.label}
          </NavLink>
        ),
        key: link.link
      }
    })
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '2rem' }}/>
}

export default Navigation