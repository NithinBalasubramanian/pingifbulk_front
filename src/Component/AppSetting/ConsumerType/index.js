import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ConsumerType = () => {
  const [tableData, setTableData] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    status: 1
  })

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
            <h1>consumer Type Management</h1>
            <Link to={'/consumer-type-form'}>
              <div className='routeButton'>Add consumer Type</div>
            </Link>
        </div>
      </div>
      <div className='contentLayout'>
      {tableData.map(itm => {
        return (
          // eslint-disable-next-line react/jsx-key
          <p>{itm.typeName}</p>
        )
      })}
      </div>
    </div>
  )
}

export default ConsumerType
