/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logstate } from '../action'
import instance from '../Api_service'
import { message } from 'antd'

const Login = ({ changeLog }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const initialState = {
    email: '',
    password: ''
  }

  const [data, setData] = useState(initialState)

  const changeState = (e) => {
    setData(prevstate => {
      return { ...prevstate, [e.target.name]: e.target.value }
    })
  }

  const login = async (e) => {
    e.preventDefault()

    const datapayload = {
      userMail: data.email,
      password: data.password
    }

    await instance.post('/user/login', datapayload)
      .then((response) => {
        const res = response.data
        if (res.success) {
          sessionStorage.setItem('userData', true)
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          dispatch(Logstate)
          history.push('/Dashboard')
        } else {
          message.error(res.msg)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
        <div className="signPart">
            <div className="signCart">
                <h1>Sign In</h1>
                <div className="form-group formSet">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={ data.email } onChange={ changeState } placeholder="example@gmail.com"></input>
                </div>
                <div className="form-group formSet">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" placeholder="***********" value={ data.password } onChange={ changeState } ></input>
                </div>
                <div className="form-group formSet">
                    <input type="submit" onClick={ login } className="form-control btn btn-sm button_class" value="SIGN IN"></input>
                </div>
                <div className="signData">
                   Not a member .<Link to="/signup" >Create a new account </Link>
                </div>
            </div>
        </div>
  )
}

export default Login
