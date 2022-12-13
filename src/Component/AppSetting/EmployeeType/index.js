import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../sharedComponent/Table'

const EmployeeType = () => {
  const [tableData, setTableData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    status: 1
  })

  const columns = [
    {
      title: 'S.No',
      key: 'index',
      type: 'number'
    },
    {
      title: 'Type Name',
      key: 'typeName',
      type: 'string'
    },
    {
      title: 'Created On',
      key: 'createdOn',
      type: 'date'
    }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await axios.get(`http://localhost:8000/v1/team/listTeams?status=${filter.status}&search=${filter.search}`)
    if (data.success) {
      setTableData(data.data)
    } else {
      console.log('Something went wrong')
      setFilter(...filter, { search: '' })
    }
  }

  return (
    <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>Employee Type Management</h1>
            <Link to={'/employee-type-form'}>
              <div className='routeButton'>Add Employee Type</div>
            </Link>
        </div>
      </div>
      <div className='contentLayout'>
        <Table columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default EmployeeType
