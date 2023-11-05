import React from 'react'
import styles from './contactPage.module.css'
import { ContactForm, FilterForm, UserMenu, ContactTable } from 'components'

const ContactPage = () => {
  return (
    <div className={styles.ContactPage}>
      <ContactForm />
      <hr />
      <FilterForm />
      <ContactTable />
      <UserMenu />
    </div>
  )
}

export default ContactPage