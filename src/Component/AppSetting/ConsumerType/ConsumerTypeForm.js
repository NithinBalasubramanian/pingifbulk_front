import axios from 'axios'
import React, { useState } from 'react'
import ButtonComponent from '../../sharedComponent/ButtonComponent'
import Input from '../../sharedComponent/Input'
import TextAreaComponent from '../../sharedComponent/TextAreaComponent'
import { useHistory } from 'react-router'

const ConsumerTypeForm = () => {
  const initialState = {
    typeName: '',
    description: ''
  }
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
    const { data } = await axios.post('http://localhost:8000/v1/consumer/addConsumerType', formState)
    if (data.success) {
      setFormState(initialState)
    } else {
      console.log('Something went wrong')
    }
  }

  const cancelBtn = () => {
    history.push('/consumer-type-management')
  }

  return (
        <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>Consumer Type Management</h1>
        </div>
      </div>
      <div className='contentLayout'>
      <div className='formLayout'>
        <form method="post" onSubmit={submitForm}>
          <Input changeHandle={changeHandle} label="User Type" defaultValue={formState.typeName} name="typeName" type="text" />
          <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />
          <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={cancelBtn} />
          <ButtonComponent classname="button-submit" type="submit" label="Submit" />
        </form>
      </div>
      </div>
    </div>
  )
}

export default ConsumerTypeForm
