import React from 'react'
import './index.scss'
import SideBar from './Sidebar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from '../Front/login'
import Signup from '../Front/signUp'
import SingleMailer from '../Component/Mailer/SingleMailer'
// import NotFound from '../Component/NotFound'
import Dashboard from './Dashboard'

// eslint-disable-next-line react/prop-types
const DashboardController = ({ logState }) => {
  return (
        <div className="Dashboard">
            <Switch>
              <Route path="/" exact >
                <div className="mid">
                  <div className="temp">
                    Bulk mailing Application development underway
                  </div>
                </div>
              </Route>
              <Route path='/signin'>
                {(logState)
                  ? <Redirect to="/Dashboard" />
                  : <Login />
                }
              </Route>
              <Route path='/signup'>
              {(logState)
                ? <Redirect to="/Dashboard" />
                : <Signup />
                }
              </Route>
              <>
                <SideBar />
                <div className="mainContent">
                  <Route path="/Dashboard">
                    <Dashboard />
                  </Route>
                  <Route path='/single-mailer'>
                    <SingleMailer />
                  </Route>
                  {/* <Route path="">
                    <NotFound />
                  </Route> */}
                </div>
              </>
            </Switch>
        </div>
  )
}

export default DashboardController
