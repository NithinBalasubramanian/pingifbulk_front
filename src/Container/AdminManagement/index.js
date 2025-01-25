import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import instance from '../../Api_service'
import Table from '../../Component/sharedComponent/Table'

const AdminManagement = () => {
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
      title: 'User Type',
      key: 'userType',
      type: 'string'
    },
    {
      title: 'User Name',
      key: 'userName',
      type: 'string'
    },
    {
      title: 'User Contact',
      key: 'contact',
      type: 'string'
    },
    {
      title: 'User Email',
      key: 'userMail',
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
    const { data } = await instance.get(`/user/updateUserStatus/${id}/${status === 1 ? 0 : 1}`)
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
    const { data } = await instance.get('/user/listusers')
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
            <h1>Admin Management</h1>
        </div>
      </div>
      <div className='contentLayout'>
        <Table columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default AdminManagement
