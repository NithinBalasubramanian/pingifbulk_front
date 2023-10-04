import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../Api_service'
import Table from '../../Component/sharedComponent/Table'

const EmployeeManagement = () => {
  const [tableData, setTableData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  const columns = [
    {
      title: 'S.No',
      key: 'index',
      type: 'number'
    },
    {
      title: 'Employee Name',
      key: 'employeeName',
      type: 'string'
    },
    {
      title: 'Email',
      key: 'mailId',
      type: 'string'
    },
    {
      title: 'Contact',
      key: 'contact',
      type: 'string'
    },
    {
      title: 'Created By',
      key: 'creatorName',
      type: 'string'
    },
    {
      title: 'Created On',
      key: 'createdOn',
      type: 'date'
    },
    {
      title: 'Status',
      key: 'status',
      type: 'switch',
      statusChange: (id, status) => changeState(id, status)
    }
  ]

  const changeState = async (id, status) => {
    const { data } = await instance.get(`/employee/updateEmployeeTypeStatus/${id}/${status === 1 ? 0 : 1}`)
    if (data.success) {
      message.success(data?.msg)
      fetchData()
    } else {
      console.log('Something went wrong')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await instance.get(`/employee/listEmployees?status=${filter.status}&search=${filter.search}`)
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
            <h1>Employee Management</h1>
            <Link to={'/employee-management-form'}>
              <div className='routeButton'>Add Employee</div>
            </Link>
        </div>
      </div>
      <div className='contentLayout'>
        <Table columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default EmployeeManagement
