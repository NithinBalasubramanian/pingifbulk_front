import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../sharedComponent/ButtonComponent'
import Input from '../../sharedComponent/Input'
import TextAreaComponent from '../../sharedComponent/TextAreaComponent'
import { useHistory, useParams } from 'react-router'

const AddForm = () => {
  const initialState = {
    typeName: '',
    description: ''
  }

  const { id } = useParams()

  const history = useHistory()

  const [formState, setFormState] = useState(initialState)

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const { data } = await axios.post('http://localhost:8000/v1/user/addUserType', formState)
    if (data.success) {
      setFormState(initialState)
      goBack()
    } else {
      console.log('Something went wrong')
    }
  }

  const fetchDetails = async (reqId) => {
    const { data } = await axios.get(`http://localhost:8000/v1/user/fetchUserTypeById/${reqId}`)
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

  console.log('data', formState)
  const goBack = () => {
    history.push('/user-type-management')
  }

  useEffect(() => {
    if (id) {
      fetchDetails(id)
    }
  }, [id])

  return (
        <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>User Type Management</h1>
        </div>
      </div>
      <div className='contentLayout'>
      <div className='formLayout'>
        <form method="post" onSubmit={submitForm}>
          <Input changeHandle={changeHandle} label="User Type" defaultValue={formState.typeName} name="typeName" type="text" />
          <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />
          <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={goBack} />
          <ButtonComponent classname="button-submit" type="submit" label="Submit" />
        </form>
      </div>
      </div>
    </div>
  )
}

export default AddForm
