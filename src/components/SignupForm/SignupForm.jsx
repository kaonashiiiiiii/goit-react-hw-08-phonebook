import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from 'store/slices/userSlice';
import { getBasicUserInfo, getUserError } from 'store/selectors';
import { MyAlert } from 'components';

// email - уникальный
// пароль - не меньше 7 символов
/* mock: {email: tester1tester1tester1@gmail.com, name: tester1, password: rootroot} */
const SignupForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const error = useSelector(getUserError)
  const user = useSelector(getBasicUserInfo)

  useEffect(() => {
    const needReset = user.name && user.email && isSubmitted && !error
    if (needReset) {
      resetForm()
    }
    // eslint-disable-next-line
  }, [isSubmitted, user.name, user.email])

  function onFinish (values) {
    dispatch(signupUser(values))
    setIsSubmitted(true)
  }

  function onFinishFailed (errorInfo) {
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

  const userCreated = !error && user.name && user.email && isSubmitted
  const erorrMsg = error && isSubmitted
  return (
    <>
      {erorrMsg && <MyAlert type="error" message="Can't create a new user!!!"/>}
      {userCreated && <MyAlert type="success" message="New user was created"/>}
      <Form
        form={form}
        name="signup"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          width: 700,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email'
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              min: 7
            },
          ]}
        > 
        <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SignupForm