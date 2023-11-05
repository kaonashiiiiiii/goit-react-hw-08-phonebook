import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBasicUserInfo, getUserToken } from 'store/selectors'
import { logoutUser } from 'store/slices/userSlice'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import styles from './userMenu.module.css'

const UserMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector(getBasicUserInfo)
  const token = useSelector(getUserToken)
  if (!token) {
    return null
  }

  function onLogoutClick () {
    dispatch(logoutUser(token))
  }
  return (
    <div className={styles.logoutMenu}>
      <p>{user.email}</p>
      <Button 
        type="primary"
        icon={<LogoutOutlined />}
        danger
        onClick={onLogoutClick}
      >
        Logout
      </Button>
    </div>
  )
}

export default UserMenu