import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import instance from '../../Api_service'
import Table from '../../Component/sharedComponent/Table'

const ConsumerManagement = () => {
  const history = useHistory()
  const [tableData, setTableData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    status: ''
  })

  const columns = [
    {
      title: 'S.No',
      key: 'index',
      type: 'number',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Consumer Type',
      key: 'consumerType',
      type: 'string',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Consumer Name',
      key: 'consumerName',
      type: 'string',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Email Id',
      key: 'mailId',
      type: 'string',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Contact',
      key: 'contact',
      type: 'string',
      clickHandle: (id) => onClickHandle(id)
    },
    {
      title: 'Created By',
      key: 'createdBy',
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

  const onClickHandle = (id) => {
    history.push(`/consumer-management-form/${id}`)
  }

  const changeState = async (id, status) => {
    const { data } = await instance.get(`/consumer/consumerStatusUpdate/${id}/${status === 1 ? 0 : 1}`)
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
    const { data } = await instance.get(`/consumer/listConsumers?status=${filter.status}&search=${filter.search}`)
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
            <Link to={'/consumer-management-form/1'}>
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
