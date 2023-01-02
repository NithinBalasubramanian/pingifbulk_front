import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../sharedComponent/ButtonComponent'
import Input from '../../sharedComponent/Input'
import TextAreaComponent from '../../sharedComponent/TextAreaComponent'
import { useHistory, useParams } from 'react-router'
import { message } from 'antd'
import instance from '../../../Api_service'

const AddForm = () => {
  const initialState = {
    typeName: '',
    description: ''
  }

  let defaultId = ''
  const { id } = useParams()

  if (id) {
    defaultId = id
  }

  const history = useHistory()

  const [formId, setFormId] = useState(defaultId)
  const [formState, setFormState] = useState({})

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { data } = await instance.post('/user/addUserType', formState)
    if (data.success) {
      message.success(data.msg)
      setFormState(initialState)
      goBack()
    } else {
      console.log('Something went wrong')
    }
  }

  const updateForm = async (e) => {
    e.preventDefault()
    const { data } = await instance.post(`/user/updateUserType/${id}`, formState)
    if (data.success) {
      message.success(data.msg)
      setFormState(initialState)
      goBack()
    } else {
      console.log('Something went wrong')
    }
  }

  const fetchDetails = async (reqId) => {
    const { data } = await instance.get(`/user/fetchUserTypeById/${reqId}`)
    if (data.success) {
      const respData = data.data[0]
      const setResData = {
        typeName: respData.typeName,
        description: respData.description
      }
      setFormState(setResData)
    } else {
      console.log('Something went wrong')
    }
  }

  const goBack = () => {
    history.push('/user-type-management')
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
    <>
      {id &&
        <div className='mainLayout'>
          <div className='headerLayout'>
            <div className='headerTitle'>
                <h1>{id !== '1' ? 'Update' : 'Add' } User Type </h1>
            </div>
          </div>
          <div className='contentLayout'>
            <div className='formLayout'>
              <form method="post" onSubmit={id !== '1' ? updateForm : submitForm}>
                <Input changeHandle={changeHandle} label="User Type" defaultValue={formState.typeName} name="typeName" type="text" />
                <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />
                <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={goBack} />
                <ButtonComponent classname="button-submit" type="submit" label={id !== '1' ? 'Update' : 'Submit'} />
              </form>
            </div>
          </div>
        </div>
      }
  </>
  )
}

export default AddForm
