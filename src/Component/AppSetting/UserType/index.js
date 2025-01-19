import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import instance from '../../../Api_service'

import Table from '../../sharedComponent/Table'

const UserType = () => {
  const history = useHistory()
  const [tableData, setTableData] = useState([])

  const onClickHandle = (id) => {
    history.push(`/user-type-form/${id}`)
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
      key: 'typeDisplayName',
      type: 'string',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Created On',
      key: 'createdOn',
      type: 'date',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Status',
      key: 'status',
      type: 'switch',
      statusChange: (id, status) => changeState(id, status)
    }
  ]

  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await instance.get(`/user/fetchUserType?status=${filter.status}&search=${filter.search}`)
    if (data.success) {
      setTableData(data.data)
    } else {
      console.log('Something went wrong')
      setFilter(...filter, { search: '' })
    }
  }

  const changeState = async (id, status) => {
    const { data } = await instance.get(`/user/updateUserTypeStatus/${id}/${status === 1 ? 0 : 1}`)
    if (data.success) {
      message.success(data?.msg)
      fetchData()
    } else {
      console.log('Something went wrong')
    }
  }

  return (
    <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>User Type Management</h1>
            <Link to={'/user-type-form/1'}>
              <div className='routeButton'>Add User Type</div>
            </Link>
        </div>
      </div>
      <div className='contentLayout'>
        <Table columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default UserType
