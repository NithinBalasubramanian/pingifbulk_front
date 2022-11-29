import React from 'react'

// eslint-disable-next-line react/prop-types
const TextAreaComponent = ({ changeHandle, name, classname = '', defaultValue = '', label, type, rows = '5' }) => (
    <div className={`form-group ${classname}`}>
        <label htmlFor="exampleInputEmail1">{ label }</label>
        <textarea type={type} name={name} onChange={changeHandle} className="form-control" value={defaultValue} rows={rows}></textarea>
    </div>
)

export default TextAreaComponent
