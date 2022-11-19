import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const initialState = {
    name: '',
    email: '',
    contact: '',
    password: '',
    secPassword: ''
  }

  const [data, setData] = useState(initialState)

  const changeState = (e) => {
    setData(prevstate => {
      return { ...prevstate, [e.target.name]: e.target.value }
    })
  }

  // Registers data restapi in pingifbulk infonixmedia ( codeigniter )

  const register = (e) => {
    e.preventDefault()

    // payload to update

    const datapayload = {
      user_name: data.name,
      user_type: 1,
      email: data.email,
      contact: data.contact,
      password: data.password,
      status: 1,
      verification: 1

    }

    // checking data to shipping

    console.log(datapayload)

    axios.post('http://pingifbulk.infonixmedia.in/Api/insertData/users', datapayload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        setData(initialState)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
        <div className="signPart">
            <div className="signCart">
                <h1>Sign Up</h1>
                <div className="form-group formSet">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="User Name" name="name" onChange={ changeState } value={ data.name }></input>
                </div>
                <div className="form-group formSet">
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="example@gmail.com" name="email" onChange={ changeState } value={ data.email }></input>
                </div>
                <div className="form-group formSet">
                    <label>Contact</label>
                    <input type="text" className="form-control" placeholder="Enter contact" name="contact" onChange={ changeState } value={ data.contact }></input>
                </div>
                <div className="form-group formSet">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="***********" name="password" onChange={ changeState } value={ data.password }></input>
                </div>
                <div className="form-group formSet">
                    <label>Re-type Password</label>
                    <input type="password" className="form-control" placeholder="***********" name="secPassword" onChange={ changeState } value={ data.secPassword }></input>
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
