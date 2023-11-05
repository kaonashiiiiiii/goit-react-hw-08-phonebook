import React from 'react'
import styles from './loginPage.module.css'
import { LoginForm, UserMenu } from 'components'

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <LoginForm />
      <UserMenu />
    </div>
  )
}

export default LoginPage