import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getContactsLoadingStatus, getFilteredTableContacts, getFullUserInfo } from 'store/selectors'
import { Table, Space, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { deleteContact, getUserContacts } from 'store/slices/contactsSlice'
import styles from './contactTable.module.css'
import { Spinner } from 'components'


const ContactTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone number',
      dataIndex: 'number',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' danger onClick={() =>onDeleteContact(record.key)} icon={<DeleteOutlined />}>Delete</Button>
        </Space>
      ),
    },
  ]
  const dispatch = useDispatch()
  const contacts = useSelector(getFilteredTableContacts)
  const userInfo = useSelector(getFullUserInfo)
  const loading = useSelector(getContactsLoadingStatus)
  
  function onDeleteContact (contactId) {
    console.log(contactId)
    const params = { contactId, token: userInfo.token}
    dispatch(deleteContact(params))
  }

  useEffect(() => {
    dispatch(getUserContacts(userInfo.token))
    // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.ContactTable}>
      <h2>{userInfo.name} Contacts</h2>
      {loading && <Spinner />}
      <Table style={{ marginTop: '2rem', minWidth: 700}} columns={columns} dataSource={contacts} />
    </div>
  )
}

export default ContactTable