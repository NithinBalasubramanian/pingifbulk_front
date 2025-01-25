import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import TextAreaComponent from '../../Component/sharedComponent/TextAreaComponent'
import Input from '../../Component/sharedComponent/Input'
import { useHistory, useParams } from 'react-router'
import instance from '../../Api_service'
import Select from '../../Component/sharedComponent/Select'
import { message } from 'antd'

const UserForm = () => {
  const initialState = {
    companyName: '',
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

  useEffect(() => {
    if (formId !== '1') {
      fetchUpdateData()
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
      const { data } = await instance.post('/client/clientAdd', formState)
      if (data.success) {
        message.success(data.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    } else {
      const { data } = await instance.post(`/client/clientUpdate/${formId}`, formState)
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
    history.push('/user-management')
  }

  const fetchUpdateData = async () => {
    const { data } = await instance.get(`/client/fetchClientById/${formId}`)
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
            <h1>{formId === '1' ? 'Add' : 'Update'} Client </h1>
        </div>
      </div>
      <div className='contentLayout'>
      <div className='formLayout'>
        <form method="post" onSubmit={submitForm}>
          <Input
            changeHandle={changeHandle}
            label="Company Name"
            defaultValue={formState.companyName}
            name="companyName"
            type="text"
          />
          <Input
            changeHandle={changeHandle}
            label="Email Id"
            defaultValue={formState.mailId}
            name="mailId" type="text" />
            {formId === '1' && (
              <Input
                  changeHandle={changeHandle}
                  label="Password"
                  defaultValue={formState.password}
                  name="password" type="password" /> 
              )}
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

export default UserForm
