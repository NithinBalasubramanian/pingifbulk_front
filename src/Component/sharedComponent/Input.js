import React from 'react'

// eslint-disable-next-line react/prop-types
const Input = ({ changeHandle, name, reference, classname = '', defaultValue = '', label, type }) => (
    <div className={`form-group ${classname}`}>
        <label htmlFor="exampleInputEmail1">{ label }</label>
        <input type={type} ref={reference} name={name} onChange={(e) => changeHandle(e)} className="form-control" value={defaultValue} placeholder={label}/>
    </div>
)

export default Input
