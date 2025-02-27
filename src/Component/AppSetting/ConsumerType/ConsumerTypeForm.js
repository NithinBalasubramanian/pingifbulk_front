import React, { useState, useEffect } from 'react'
import ButtonComponent from '../../sharedComponent/ButtonComponent'
import Input from '../../sharedComponent/Input'
import TextAreaComponent from '../../sharedComponent/TextAreaComponent'
import { useHistory, useParams } from 'react-router'
import { message } from 'antd'
import instance from '../../../Api_service'

const ConsumerTypeForm = () => {
  const initialState = {
    typeName: '',
    description: ''
  }
  const history = useHistory()

  let defaultId = ''
  const { id } = useParams()

  if (id) {
    defaultId = id
  }

  const [formId, setFormId] = useState(defaultId)
  const [formState, setFormState] = useState(initialState)

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { data } = await instance.post('/consumer/addConsumerType', formState)
    if (data.success) {
      message.success(data.msg)
      setFormState(initialState)
      cancelBtn()
    } else {
      message.success('Something went wrong')
      console.log('Something went wrong')
    }
  }

  const cancelBtn = () => {
    history.push('/consumer-type-management')
  }

  const updateForm = async (e) => {
    e.preventDefault()
    try {
      const { data } = await instance.post(`/consumer/updateConsumerType/${id}`, formState)
      if (data?.success) {
        message.success(data?.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const fetchDetails = async (reqId) => {
    const { data } = await instance.get(`/consumer/fetchConsumerTypeById/${reqId}`)
    if (data.success) {
      const respData = data.data[0]
      const setResData = {
        typeName: respData.typeDisplayName,
        description: respData.description,
        orgName: respData.orgName
      }
      setFormState(setResData)
    } else {
      console.log('Something went wrong')
    }
  }

  useEffect(() => {
    if (id && id !== '1') {
      fetchDetails(id)
    } else {
      setFormId(id)
      setFormState(initialState)
    }
  }, [formId])

  return (
        <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>{id !== '1' ? 'Update' : 'Add' } Consumer Type</h1>
        </div>
      </div>
      <div className='contentLayout'>
      <div className='formLayout'>
        <form method="post" onSubmit={id !== '1' ? updateForm : submitForm}>
          <Input changeHandle={changeHandle} label="Consumer Type" defaultValue={formState.typeName} name="typeName" type="text" />
          <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />
          <Input changeHandle={changeHandle} label="Organization / Company name" defaultValue={formState.orgName} name="orgName" type="text" />
          <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={cancelBtn} />
          <ButtonComponent classname="button-submit" type="submit" label={id !== '1' ? 'Update' : 'Submit'} />
        </form>
      </div>
      </div>
    </div>
  )
}

export default ConsumerTypeForm
