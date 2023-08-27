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

  const [filter, setFilter] = useState({
    search: '',
    status: 1
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
