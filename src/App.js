import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { Mode } from './action/index'
import { BrowserRouter } from 'react-router-dom'

// pages

import Header from './Front/include/header'
import Footer from './Front/include/footer'

// dashboard

import DashboardController from './Dashboard/DashboardController'
import './notification'

const App = () => {
  // const dispatch = useDispatch()

  const stateMode = useSelector(state => state.Mode)
  const logStatus = useSelector(state => state.Log)

  const [mode, setMode] = useState(false)

  const changeMode = () => {
    if (localStorage.getItem('mode')) {
      localStorage.setItem('mode', localStorage.getItem('mode') === 'Light' ? 'Dark' : 'Light')
      setMode(localStorage.getItem('mode') === 'Light')
    } else {
      setMode(true)
      localStorage.setItem('mode', 'Dark')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('mode')) {
      setMode(localStorage.getItem('mode') === 'Light')
    } else {
      setMode(stateMode)
    }
  }, [])

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
