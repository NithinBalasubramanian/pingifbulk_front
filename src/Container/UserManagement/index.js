import React, { useEffect, useState } from 'react'
import instance from '../../Api_service'
import Table from '../../Component/sharedComponent/Table'

const UserManagement = () => {
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
      title: 'Quick Access',
      key: 'status',
      type: 'switch'
    }
  ]

  const statusChange = (id) => {
    console.log(id)
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
            <h1>User Management</h1>
        </div>
      </div>
      <div className='contentLayout'>
        <Table columns={columns} tableData={tableData} statusChange={statusChange} />
      </div>
    </div>
  )
}

export default UserManagement
