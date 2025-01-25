import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import instance from '../Api_service'
import { message } from 'antd'

const Signup = () => {
  const initialState = {
    name: '',
    email: '',
    contact: '',
    password: '',
    secPassword: ''
  }

  const [formData, setFormData] = useState(initialState)
  const history = useHistory()

  const changeState = (e) => {
    setFormData(prevstate => {
      return { ...prevstate, [e.target.name]: e.target.value }
    })
  }

  const register = async (e) => {
    e.preventDefault()

    // payload to update

    const datapayload = {
      userName: formData.name,
      userMail: formData.email,
      contact: formData.contact,
      password: formData.password,
      status: 1
    }

    const { data } = await instance.post('/client/registerUser', datapayload)
    if (data.success) {
      setFormData(initialState)
      message.success("User created successfully, please login to experience free trial")
      history.push('/')
    } else {
      console.log('Something went wrong')
    }
  }

  return (
        <div className="signPart">
            <div className="signCart">
                <h1>Sign Up</h1>
                <div className="form-group formSet">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="User Name" name="name" onChange={ changeState } value={ formData.name }></input>
                </div>
                <div className="form-group formSet">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="example@gmail.com" name="email" onChange={ changeState } value={ formData.email }></input>
                </div>
                <div className="form-group formSet">
                    <label>Contact</label>
                    <input type="text" className="form-control" placeholder="Enter contact" name="contact" onChange={ changeState } value={ formData.contact }></input>
                </div>
                <div className="form-group formSet">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="***********" name="password" onChange={ changeState } value={ formData.password }></input>
                </div>
                <div className="form-group formSet">
                    <label>Re-type Password</label>
                    <input type="password" className="form-control" placeholder="***********" name="secPassword" onChange={ changeState } value={ formData.secPassword }></input>
                </div>
                <div className="form-group formSet">
                    <input type="submit" className="form-control btn btn-sm button_class" value="SIGN UP" onClick={ register }></input>
                </div>
                <div className="signData">
                   Already a member .<Link to="/signin" >Sign in</Link>
                </div>
            </div>
        </div>
  )
}

export default Signup
