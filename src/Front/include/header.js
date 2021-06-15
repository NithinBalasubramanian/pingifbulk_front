import React from 'react'

const Header = (props) => {


    return(
        <div className='Header'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h1 className="logoTitle"> Pingifbulk</h1>
                    </div> 
                    <div className="col-md-6 secondColumn">
                        <p className="modeView" onClick={ props.changeHandler } >Change Mode</p>
                        <a href="" className="startButton">Get Started</a>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Header