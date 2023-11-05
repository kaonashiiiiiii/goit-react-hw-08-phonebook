import React from 'react'
import { Alert } from 'antd'
import styles from './myAlert.module.css'

const ErrorAlert = ({ message, type }) => {
  return (
    <div className={styles.Alert}>
      <Alert
        message={message}
        type={type}
        closable
      />
    </div>
  )
}

export default ErrorAlert