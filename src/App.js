import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
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

  const stateMode = useSelector(state => state.mode)

  const [mode, setMode] = useState(stateMode)

  const [logState, setlogState] = useState(false)

  const changeMode = () => {
    dispatch(Mode)
    setMode(!mode)
  }

  useEffect(() => {
    if (sessionStorage.getItem('userData')) {
      setlogState(true)
    }
  }, [])

  return (
    <div className={ mode ? 'App-dark' : 'App-light' } >
      <BrowserRouter>
        <Header changeHandler={ changeMode } modeState={ mode } />
        <DashboardController logState={logState} />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
