import React from 'react'

// eslint-disable-next-line react/prop-types
const Select = ({ changeHandle, name, reference, classname = '', defaultValue = '', label, options = [] }) => (
        <div className={`form-group ${classname}`}>
            <label htmlFor="exampleInputEmail1">{label}</label>
            <select ref={reference} name={name} onChange={(e) => changeHandle(e)} className="form-control" value={defaultValue} placeholder={label}>
                        <option value={''}>{`Select a ${label}`}</option>
                {options.map((itm) => {
                  return (
                        <option key={itm.value} value={itm.value}>{itm.name}</option>
                  )
                })}
            </select>
        </div>
)

export default Select
