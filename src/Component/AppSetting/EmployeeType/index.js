import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Table from '../../sharedComponent/Table'

const EmployeeType = () => {
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    status: 1
  })

  const onClickHandle = (id) => {
    history.push(`/employee-type-form/${id}`)
  }

  const columns = [
    {
      title: 'S.No',
      key: 'index',
      type: 'number',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Type Name',
      key: 'typeName',
      type: 'string',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Created On',
      key: 'createdOn',
      type: 'date',
      clickHandle: (id) => onClickHandle(id)
    }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await axios.get(`http://localhost:8000/v1/employee/fetchEmployeeType?status=${filter.status}&search=${filter.search}`)
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
            <Link to={'/employee-type-form/1'}>
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
