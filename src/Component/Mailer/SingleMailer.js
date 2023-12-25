import React, { useState } from 'react'
import instance from '../../Api_service'
import ButtonComponent from '../sharedComponent/ButtonComponent'
import Input from '../sharedComponent/Input'
import TextAreaComponent from '../sharedComponent/TextAreaComponent'

const SingleMailer = () => {
  const initialState = {
    toMail: '',
    subject: '',
    content: ''
  }

  const [formState, setFormState] = useState(initialState)
  const submitForm = async (e) => {
    e.preventDefault()
    const { success } = await instance.post('/mailer/mailSend', formState)
    if (success) {
      setFormState(initialState)
    } else {
      console.log('Something went wrong')
    }
  }

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  return (
        <div className='mainLayout'>
            <div className='headerLayout'>
              <div className='headerTitle'>
                <h1>Single Mailer</h1>
              </div>
            </div>
            <div className='contentLayout'>
              <div className='formLayout'>
                <form method="post" onSubmit={submitForm}>
                  <Input changeHandle={changeHandle} label="Email Address" defaultValue={formState.toMail} name="toMail" type="email" />
                  <Input changeHandle={changeHandle} label="Subject" defaultValue={formState.subject} name="subject" type="text" />
                  <TextAreaComponent name="content" changeHandle={changeHandle} defaultValue={formState.content} label="Message" rows="10" />
                  <ButtonComponent classname="button-submit" type="submit" label="Send Mail" />
                </form>
              </div>
            </div>
        </div>
  )
}

export default SingleMailer
