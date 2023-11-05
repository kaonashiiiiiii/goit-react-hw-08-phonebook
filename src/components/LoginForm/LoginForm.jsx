import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getFullUserInfo, getUserError } from 'store/selectors';
import { loginUser } from 'store/slices/userSlice';
import { MyAlert } from 'components';
import { useNavigate } from 'react-router-dom';


// email - уникальный
// пароль - не меньше 7 символов
/* mock: {email: tester1tester1tester1@gmail.com, name: tester1, password: rootroot} */
const LoginForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const error = useSelector(getUserError)
  const userInfo = useSelector(getFullUserInfo)

  useEffect(() => {
    if (userInfo.token && isSubmitted) {
      navigate('/contacts')
    }
    //eslint-disable-next-line
  }, [userInfo.token, isSubmitted])

  const onFinish = (values) => {
    setIsSubmitted(true)
    dispatch(loginUser(values))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const erorrMsg = error && isSubmitted
  return (
    <>
      {erorrMsg && <MyAlert type="error" message="Login failed"/>}
      <Form
        name="login"
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
          email: '',
          password: ''
        }}
      >
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

export default LoginForm