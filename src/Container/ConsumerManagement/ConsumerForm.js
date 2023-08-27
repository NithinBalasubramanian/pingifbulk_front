import React, { useState } from 'react'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import TextAreaComponent from '../../Component/sharedComponent/TextAreaComponent'
import Input from '../../Component/sharedComponent/Input'
import { useHistory } from 'react-router'
import instance from '../../Api_service'

const ConsumerForm = () => {
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
    const { data } = await instance.post('/user/addUserType', formState)
    if (data.success) {
      setFormState(initialState)
    } else {
      console.log('Something went wrong')
    }
  }

  const cancelBtn = () => {
    history.push('/consumer-management')
  }

  return (
    <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>Add Consumer </h1>
        </div>
      </div>
      <div className='contentLayout'>
      <div className='formLayout'>
        <form method="post" onSubmit={submitForm}>
          <Input
              changeHandle={changeHandle}
              label="Consumer Type"
              defaultValue={formState.typeName}
              name="typeName"
              type="text"
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
            label="Last Name"
            defaultValue={formState.lastName}
            name="lastName"
            type="text"
          />
          <Input
            changeHandle={changeHandle}
            label="Preffered Name"
            defaultValue={formState.prefName}
            name="prefName" type="text" />
          <Input
            changeHandle={changeHandle}
            label="Email Id"
            defaultValue={formState.email}
            name="email" type="text" />
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
