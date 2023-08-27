import React, { useState, useRef } from 'react'
import Input from '../sharedComponent/Input'
import instance from '../../Api_service'
import ButtonComponent from '../sharedComponent/ButtonComponent'
import TextAreaComponent from '../sharedComponent/TextAreaComponent'

const BulkMailer = () => {
  const initialState = {
    toMail: '',
    subject: '',
    content: ''
  }

  const emailInput = useRef()
  const [formState, setFormState] = useState(initialState)
  const [emails, setEmails] = useState([])
  const submitForm = async (e) => {
    e.preventDefault()
    const data = {
      ...formState
    }
    delete data.toMail
    data.toMail = emails
    const { success } = await instance.post('/mailer/bulkMailSend', data)
    if (success) {
      console.log('Sent successfully')
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

  const addMailHandle = () => {
    if (emailInput.current.value.trim() !== '') {
      setEmails([...emails, emailInput.current.value])
      setFormState(prevState => {
        return { ...prevState, toMail: '' }
      })
    }
  }

  return (
        <div className='mainLayout'>
            <div className='headerLayout'>
              <div className='headerTitle'>
                <h1>Bulk Mailer</h1>
              </div>
            </div>
            <div className='contentLayout'>
              <div className='formLayout'>
                <form method="post" onSubmit={submitForm}>
                  <Input changeHandle={changeHandle} reference={emailInput} label="Email Address" defaultValue={formState.toMail} name="toMail" type="email" />
                  <span onClick={addMailHandle} className="btn btn-sm">ADD</span>
                  <div>{emails.length > 0 && emails.join(' , ') }</div>
                  <Input changeHandle={changeHandle} label="Subject" defaultValue={formState.subject} name="subject" type="text" />
                  <TextAreaComponent name="content" changeHandle={changeHandle} defaultValue={formState.content} label="Message" rows="10" />
                  <ButtonComponent classname="button-submit" type="submit" label="Send Mail" />
                </form>
              </div>
            </div>
        </div>
  )
}

export default BulkMailer
