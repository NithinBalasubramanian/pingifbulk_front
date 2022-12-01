import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Mode } from './action/index'
import { BrowserRouter } from 'react-router-dom'

// pages

import Header from './Front/include/header'
import Footer from './Front/include/footer'

// dashboard

import DashboardController from './Dashboard/DashboardController'
import './notification'

const App = () => {
  const dispatch = useDispatch()

  const stateMode = useSelector(state => state.Mode)
  const logStatus = useSelector(state => state.Log)

  const [mode, setMode] = useState(stateMode)

  const changeMode = () => {
    dispatch(Mode)
    setMode(!mode)
  }

  return (
    <div className={ mode ? 'App-dark' : 'App-light' } >
      <BrowserRouter>
        <Header changeHandler={ changeMode } modeState={ mode } />
        <DashboardController logState={logStatus} />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
