/* eslint-disable react/prop-types */
import React from 'react'

const ButtonComponent = ({ type, label, changeHandler, classname }) => {
  return <button className={classname} onClick={changeHandler} type={type}>{label}</button>
}

export default ButtonComponent
