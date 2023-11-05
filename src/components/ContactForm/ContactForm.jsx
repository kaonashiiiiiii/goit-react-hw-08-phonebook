import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getContactsError, getUserToken } from 'store/selectors'
import { MyAlert } from 'components'
import { postContact } from 'store/slices/contactsSlice'
import { useEffect } from 'react'

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const token = useSelector(getUserToken)
  const error = useSelector(getContactsError)

  const onFinish = (values) => {
    setIsSubmitted(false)
    dispatch(postContact({ contact: values, token}))
    setIsSubmitted(true)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  function resetForm () {
    const resetedFields = {}
    const formValues = form.getFieldsValue()
    Object.keys(formValues).forEach(key => {
      resetedFields[key] = ''
    })
    form.setFieldsValue(resetedFields)
  }

  useEffect(() => {
    const needReset = !error && isSubmitted
    if (needReset) {
      resetForm()
    }
    // eslint-disable-next-line
  }, [isSubmitted])

  const erorrMsg = error && isSubmitted
  const successMsg = !error && isSubmitted
  return (
    <>
      {successMsg && <MyAlert type="success" message="Contact was successfully added"/>}
      {erorrMsg && <MyAlert type="error" message="Contact was not added"/>}
      <Form
        form={form}
        name="contact"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: 700,
          margin: '0 auto',
        }}
        initialValues={{
          name: '',
          number: ''
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input contact name!',
              min: 3
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="number"
          rules={[
            {
              required: true,
              message: 'Please input contact\'s phone number',
              min: 5
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ContactForm