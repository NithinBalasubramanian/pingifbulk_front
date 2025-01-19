/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import { useDispatch } from 'react-redux'
import { LogOutstate } from '../../action/index'
import { Switch } from 'antd'

const Header = ({ changeHandler }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const [logState, setLogState] = useState(false)

  const logoutHandle = () => {
    sessionStorage.removeItem('userData')
    localStorage.removeItem('userInfo')
    localStorage.clear()
    dispatch(LogOutstate)
    // history.replace('/')
    window.location.reload()
  }

  const logCheck = localStorage.getItem('userInfo')

  useEffect(() => {
    setLogState(logCheck)
  }, [logCheck, location])

  return (
        <div className='Header'>
            <div className="headCont">
                <div className="row justify-content-between">
                    <div className="col-md-4">
                        <h1>
                            <Link to="" className="logoTitle">
                              Pingifbulk
                            </Link>
                        </h1>
                    </div>
                    <div className="col-md-8 secondColumn">
                        {/* <p className="modeView"><Switch onChange={changeHandler} /> Mode</p> */}
                        <Link to="" className="homeBack">HOME</Link>
                        {logState
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
