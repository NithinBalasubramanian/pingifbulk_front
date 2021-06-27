import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import React , { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Mode } from './action/index'
import {  BrowserRouter , Switch , Route , Redirect} from 'react-router-dom'

//pages

import Header from './Front/include/header'
import Footer from './Front/include/footer'

import Login from './Front/login'
import Signup from './Front/signUp'

//dashboard 

import DashboardController from './Dashboard/DashboardController'

const App = () => {

  let dispatch = useDispatch();

  let stateMode = useSelector(state => state.mode);

  let [ mode , setMode ]  = useState(stateMode);

  let [ logState , setlogState ] = useState(false);

  const changeMode = () => {
    dispatch(Mode);
    setMode(!mode);
  }

  useEffect(()=>{
    if(sessionStorage.getItem("userData")){ 
      setlogState(true);
    }
  },[]);

  return (
    <div  className={ mode ? 'App-dark'  : 'App-light' } >
      <BrowserRouter>
        <Header changeHandler={ changeMode } modeState={ mode } />
        <Switch>
          <Route path="/" exact >
            <div className="mid">
              <div className="temp">
                Bulk mailing Application development underway
              </div>
            </div>
          </Route>
          <Route path='/signin'>
            {(logState) ? 
              <Redirect to="/Dashboard" /> : 
              <Login /> 
            }
          </Route>
          <Route path='/signup'>
          {(logState) ? 
              <Redirect to="/Dashboard" /> : 
              <Signup />
            }
          </Route>
          <Route path='/Dashboard'>
            <DashboardController />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
