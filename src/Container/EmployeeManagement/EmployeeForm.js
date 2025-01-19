import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import Input from '../../Component/sharedComponent/Input'
import { useHistory, useParams } from 'react-router'
import Select from '../../Component/sharedComponent/Select'
import instance from '../../Api_service'
import { message } from 'antd'

const EmployeeForm = () => {
  const initialState = {
    employeeTypeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mailId: '',
    contact: '',
    description: ''
  }
  const history = useHistory()
  let defaultId = ''
  const { id } = useParams()

  if (id) {
    defaultId = id
  }

  const [formId] = useState(defaultId)
  const [formState, setFormState] = useState(initialState)
  const [employeeTypeList, setEmployeeTypeList] = useState([])

  useEffect(() => {
    fetchEmployeeType()
    if (formId !== '1') {
      fetchEmployeeData()
    }
  }, [formId])

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if (formId === '1') {
      const { data } = await instance.post('/employee/addEmployee', formState)
      if (data.success) {
        message.success(data.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    } else {
      const { data } = await instance.post(`/employee/updateEmployee/${formId}`, formState)
      if (data.success) {
        message.success(data.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    }
  }

  const cancelBtn = () => {
    history.push('/employee-management')
  }

  const fetchEmployeeType = async () => {
    const { data } = await instance.get('/employee/fetchEmployeeType?status=1')
    if (data.success) {
      const filterOption = data.data.map((itm) => (
        { value: itm._id, name: itm.typeDisplayName }
      ))
      setEmployeeTypeList(filterOption)
    } else {
      console.log('Something went wrong')
    }
  }

  const fetchEmployeeData = async () => {
    const { data } = await instance.get(`/employee/fetchEmployeeById/${formId}`)
    if (data.success) {
      setFormState(data.data)
    } else {
      console.log('Something went wrong')
    }
  }

  return (
    <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>{formId === '1' ? 'Add' : 'Update'} Employee </h1>
        </div>
      </div>
      <div className='contentLayout'>
        <div className='formLayout'>
          <form method="post" onSubmit={submitForm}>
          <Select
                changeHandle={changeHandle}
                label="Employee Type"
                defaultValue={formState.employeeTypeId}
                name="employeeTypeId"
                options={employeeTypeList}
            />
            <Input
              changeHandle={changeHandle}
              label="First Name"
              defaultValue={formState.firstName}
              name="firstName"
              type="text"
            />
            <Input
              changeHandle={changeHandle}
              label="Middle Name"
              defaultValue={formState.middleName}
              name="middleName" type="text" />
            <Input
              changeHandle={changeHandle}
              label="Last Name"
              defaultValue={formState.lastName}
              name="lastName"
              type="text"
            />
            <Input
              changeHandle={changeHandle}
              label="Email Id"
              defaultValue={formState.mailId}
              name="mailId" type="text" />
            <Input
              changeHandle={changeHandle}
              label="Contact"
              defaultValue={formState.contact}
              name="contact" type="text" />

            <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={cancelBtn} />
            <ButtonComponent classname="button-submit" type="submit" label="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmployeeForm
