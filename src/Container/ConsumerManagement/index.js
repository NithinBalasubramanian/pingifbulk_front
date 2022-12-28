import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import instance from '../../Api_service'
import Table from '../../Component/sharedComponent/Table'

const ConsumerManagement = () => {
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
    const { data } = await instance.get(`/team/listTeams?status=${filter.status}&search=${filter.search}`)
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
            <h1>Consumer Management</h1>
            <Link to={'/consumer-management-form'}>
              <div className='routeButton'>Add Consumer</div>
            </Link>
        </div>
      </div>
      <div className='contentLayout'>
        <Table columns={columns} tableData={tableData} />
      </div>
    </div>
  )
}

export default ConsumerManagement
