/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
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
                        <p className="modeView" onClick={ props?.changeHandler } >Change Mode</p>
                        <Link to="" className="homeBack">HOME</Link>
                        {!sessionStorage.getItem('userData') &&
                            <Link to="signin" className="startButton">Get Started</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Header
