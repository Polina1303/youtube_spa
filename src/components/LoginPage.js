import { Form, Input,Button } from 'antd';
import { LockOutlined, UserOutlined, YoutubeOutlined } from '@ant-design/icons';
import React from 'react';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { login, password } from '../redux/action'
import { LOGIN, PASSWORD } from './constans/constans'
import axios from 'axios'


function LoginPage({ isToken, setIsToken }) {
  const state = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const onFinish = async (state) => {
     
      console.log('consolstate',state,'login',state.username,'password',state.password)
    try {
      const response = await axios.post('https://typ-back-end.herokuapp.com/api/login', {'login':state.username,'password': state.password}) 
          console.log(response)
           if (response.data.isAuth) {
        localStorage.setItem('login',state.username)
        localStorage.setItem('token',response.data.token)
        setIsToken(!isToken);
      } else  {
        console.log('Такой пользователь не существует. Попробуйте еще раз')
       
      }
    }
    catch (e) {
      console.log(e)
         }
  }

  function handlerLogin(e) {
    dispatch(login(LOGIN, e.target.value))
    console.log(state.login)
  }

  function handlerPassworde(e) {
    dispatch(password(PASSWORD, e.target.value))
    console.log(state.password)
  }


  return (
    <div className='auth'>
      <div className='youtube-icon'>
        <YoutubeOutlined style={{ color: '#1390E5', fontSize: '60px' }} />
        <h3>Вход</h3>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
          onChange={handlerLogin}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
          onChange={handlerPassworde}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default LoginPage;




// function onFinish(e) {
//   e.preventDefault()
//   console.log('login', state.login, state.password)
//   try {
//     const response = await axios.post('https://typ-back-end.herokuapp.com/api/login', { 'login': state.login, 'password':state.password })
//     const token = response.data.token
//     localStorage.setItem('login', state.login)
//     localStorage.setItem('password', state.password)
//     console.log(token)
//   } catch (error) {
//     console.log(error)
//   }
// }