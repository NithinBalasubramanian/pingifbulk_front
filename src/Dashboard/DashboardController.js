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
const DashboardController = ({ logState, changeLog }) => {
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
                  : <Login changeLog={changeLog} />
                }
              </Route>
              <Route path='/signup'>
              {(logState)
                ? <Redirect to="/Dashboard" />
                : <Signup />
                }
              </Route>
              {logState
                ? <>
                  <SideBar />
                  <div className="mainContent">
                    <Route path="/Dashboard">
                      <Dashboard />
                    </Route>
                    <Route path='/single-mailer'>
                      <SingleMailer />
                    </Route>
                  </div>
                </>
                : <Redirect to="/signin" />
              }
            </Switch>
        </div>
  )
}

export default DashboardController
