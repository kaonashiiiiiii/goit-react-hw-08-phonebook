import React, { useState } from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './navigation.module.css'
import { useEffect } from 'react'
const Navigation = ({ links }) => {
  const location = useLocation()
  const [current, setCurrent] = useState('login')
  useEffect(() => {
    setCurrent(location.pathname.slice(1))
  }, [location.pathname])
  const onClick = (e) => {
    setCurrent(e.key)
  }
  const items = links.map((link) => {
    return {
      label: (
        <NavLink to={`/${link.toLowerCase()}`} className={({ isActive }) => 
          isActive ? styles.active : ''
        }>
          {link}
        </NavLink>
      ),
      key: link.toLowerCase()
    }
  })
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: '2rem' }}/>
}

export default Navigation