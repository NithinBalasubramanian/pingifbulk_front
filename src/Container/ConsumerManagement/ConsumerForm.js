import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import TextAreaComponent from '../../Component/sharedComponent/TextAreaComponent'
import Input from '../../Component/sharedComponent/Input'
import { useHistory, useParams } from 'react-router'
import instance from '../../Api_service'
import Select from '../../Component/sharedComponent/Select'
import { message } from 'antd'

const ConsumerForm = () => {
  const initialState = {
    consumerTypeId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mailId: '',
    password: '',
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
  const [consumerType, setConsumerType] = useState([])

  useEffect(() => {
    fetchConsumerType()
    if (formId !== '1') {
      fetchConsumerData()
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
      const { data } = await instance.post('/consumer/addConsumer', formState)
      if (data.success) {
        message.success(data.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    } else {
      const { data } = await instance.post(`/consumer/consumerUpdate/${formId}`, formState)
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
    history.push('/consumer-management')
  }

  const fetchConsumerType = async () => {
    const { data } = await instance.get('/consumer/fetchConsumerType?status=1')
    if (data.success) {
      const filterOption = data.data.map((itm) => (
        { value: itm._id, name: itm.typeName }
      ))
      setConsumerType(filterOption)
    } else {
      console.log('Something went wrong')
    }
  }

  const fetchConsumerData = async () => {
    const { data } = await instance.get(`/consumer/fetchConsumerById/${formId}`)
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
            <h1>{formId === '1' ? 'Add' : 'Update'} Consumer </h1>
        </div>
      </div>
      <div className='contentLayout'>
      <div className='formLayout'>
        <form method="post" onSubmit={submitForm}>
          <Select
              changeHandle={changeHandle}
              label="Consumer Type"
              defaultValue={formState.consumerTypeId}
              name="consumerTypeId"
              options={consumerType}
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
              label="Password"
              defaultValue={formState.password}
              name="password" type="password" />
          <Input
            changeHandle={changeHandle}
            label="Contact"
            defaultValue={formState.contact}
            name="contact" type="text" />
          <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />

          <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={cancelBtn} />
          <ButtonComponent classname="button-submit" type="submit" label="Submit" />
        </form>
      </div>
      </div>
    </div>
  )
}

export default ConsumerForm
