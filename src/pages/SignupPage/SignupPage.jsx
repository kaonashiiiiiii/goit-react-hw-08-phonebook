import React from 'react'
import { SignupForm, UserMenu } from 'components'
import styles from './signupPage.module.css'

const SignupPage = () => {
  return (
    <div className={styles.SignupPage}>
      <SignupForm />
      <UserMenu />
    </div>
  )
}

export default SignupPage