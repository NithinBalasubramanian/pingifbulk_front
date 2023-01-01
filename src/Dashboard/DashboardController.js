import React from 'react'
import './index.scss'
import SideBar from './Sidebar'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../Front/login'
import Signup from '../Front/signUp'
// import NotFound from '../Component/NotFound'
import Dashboard from './Dashboard'

// Modules
import SingleMailer from '../Component/Mailer/SingleMailer'
import UserManagement from '../Container/UserManagement'
import TeamManagement from '../Container/TeamManagement'
import ConsumerManagement from '../Container/ConsumerManagement'
import UserType from '../Component/AppSetting/UserType'
import ConsumerType from '../Component/AppSetting/ConsumerType'
import TeamType from '../Component/AppSetting/TeamType'
import AddForm from '../Component/AppSetting/UserType/AddForm'
import AddTeamTypeForm from '../Component/AppSetting/TeamType/AddTeamTypeForm'
import ConsumerTypeForm from '../Component/AppSetting/ConsumerType/ConsumerTypeForm'
import EmployeeType from '../Component/AppSetting/EmployeeType'
import AddEmployeeTypeForm from '../Component/AppSetting/EmployeeType/AddEmplyeeTypeForm'
import EmployeeManagement from '../Container/EmployeeManagement'
import EmployeeForm from '../Container/EmployeeManagement/EmployeeForm'
import TeamForm from '../Container/TeamManagement/TeamForm'
import ConsumerForm from '../Container/ConsumerManagement/ConsumerForm'
import BulkMailer from '../Component/Mailer/BulkMailer'
// import Mail from '../Component/Mailer/Mail'

// eslint-disable-next-line react/prop-types
const DashboardController = ({ logState, changeLog }) => {
  const logCheck = localStorage.getItem('userInfo')

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
              {logState || logCheck
                ? <>
                  <SideBar />
                  <div className="mainContent">
                    <Route path="/Dashboard">
                      <Dashboard />
                    </Route>
                    <Route path='/single-mailer'>
                      <SingleMailer />
                    </Route>
                    <Route path='/bulk-mailer'>
                      <BulkMailer />
                    </Route>
                    <Route path='/user-management'>
                      <UserManagement />
                    </Route>
                    <Route path='/employee-management'>
                      <EmployeeManagement />
                    </Route>
                    <Route path='/employee-management-form'>
                      <EmployeeForm />
                    </Route>
                    <Route path='/team-management'>
                      <TeamManagement />
                    </Route>
                    <Route path='/team-management-form'>
                      <TeamForm />
                    </Route>
                    <Route path='/consumer-management'>
                      <ConsumerManagement />
                    </Route>
                    <Route path='/consumer-management-form'>
                      <ConsumerForm />
                    </Route>
                    <Route path='/user-type-management'>
                      <UserType />
                    </Route>
                    <Route path='/user-type-form/:id'>
                      <AddForm />
                    </Route>
                    <Route path='/consumer-type-management'>
                      <ConsumerType />
                    </Route>
                    <Route path='/consumer-type-form/:id'>
                      <ConsumerTypeForm />
                    </Route>
                    <Route path='/employee-type-management'>
                      <EmployeeType />
                    </Route>
                    <Route path='/employee-type-form/:id'>
                      <AddEmployeeTypeForm />
                    </Route>
                    <Route path='/team-type-management'>
                      <TeamType />
                    </Route>
                    <Route path='/team-type-form/:id'>
                      <AddTeamTypeForm />
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
