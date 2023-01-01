/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import { useDispatch, useSelector } from 'react-redux'
import { Logstate } from '../../action/index'
import { Switch } from 'antd'

const Header = ({ changeHandler }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const logoutHandle = () => {
    sessionStorage.removeItem('userData')
    localStorage.removeItem('userinfo')
    dispatch(Logstate)
    history.push('/')
  }

  const logStatus = useSelector(state => state.Log)
  const logCheck = localStorage.getItem('userInfo')

  return (
        <div className='Header'>
            <div className="headCont">
                <div className="row">
                    <div className="col-md-4">
                        <h1>
                            <Link to="" className="logoTitle">
                              Pingifbulk
                            </Link>
                        </h1>
                    </div>
                    <div className="col-md-8 secondColumn">
                        <p className="modeView"><Switch onChange={changeHandler} /> Mode</p>
                        <Link to="" className="homeBack">HOME</Link>
                        {logStatus || logCheck
                          ? <ButtonComponent type="button" changeHandler={logoutHandle} label="Log Out" classname="startButton"/>
                          : <Link to="signin" className="startButton">Get Started</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Header
