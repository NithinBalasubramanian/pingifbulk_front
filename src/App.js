import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import React , { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Mode } from './action/index'

//pages

import Header from './Front/include/header'

const App = () => {

  let dispatch = useDispatch();

  let stateMode = useSelector(state => state.mode);

  let [ mode , setMode ]  = useState(stateMode);

  const changeMode = () => {
    dispatch(Mode);
    setMode(!mode);
  }

  return (
    <div className={ mode ? 'App-dark'  : 'App-light' }>
      <Header changeHandler={ changeMode } modeState={ mode } />
    </div>
  );
}

export default App;
