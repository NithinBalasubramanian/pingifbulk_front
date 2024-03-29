import React from 'react'
import moment from 'moment'
import { Switch } from 'antd'

// eslint-disable-next-line react/prop-types
const Table = ({ columns = [], tableData = [] }) => {
  return (
    <div className='table-responsive'>
        <table className="table table-bordered table-hover">
            <thead className="thead-dark table-header">
                <tr>
                {columns.length > 0 && columns.map((itm, index) => {
                  return <th key={ index + 1 }>{itm.title}</th>
                })}
                </tr>
            </thead>
            <tbody>
                {tableData.length > 0 && tableData.map((dataItm, sindex) => (
                <tr key={sindex + 1}>
                    {columns.length > 0 && columns.map((itm, index) => (
                        <>
                            <td onClick={itm.clickHandle ? () => { itm.clickHandle(dataItm._id) } : null } key={index + 1}>
                                {itm.key === 'index' ? sindex + 1 : itm.type === 'date' ? moment(dataItm[itm.key]).format('DD-MM-YYYY') : itm.type === 'switch' ? <Switch defaultChecked={dataItm[itm.key] === 1} onChange={() => itm.statusChange(dataItm._id, dataItm.status)} /> : dataItm[itm.key] }
                            </td>
                        </>
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table
