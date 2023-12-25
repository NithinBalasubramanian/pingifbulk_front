import React, { useState } from 'react'
import Input from '../sharedComponent/Input'
import instance from '../../Api_service'
import ButtonComponent from '../sharedComponent/ButtonComponent'
import TextAreaComponent from '../sharedComponent/TextAreaComponent'
import Select from '../sharedComponent/Select'
import { message } from 'antd'

const Mailer = () => {
  const initialState = {
    type: '',
    categoryType: '',
    toMail: '',
    subject: '',
    content: ''
  }

  const selectType = [
    { value: 1, name: 'Consumer' },
    { value: 2, name: 'Users' },
    { value: 3, name: 'Employee' }
  ]

  const [formState, setFormState] = useState(initialState)
  const [emails, setEmails] = useState([])
  const [types] = useState(selectType)
  const [typesList, setTypesList] = useState([])

  const submitForm = async (e) => {
    e.preventDefault()
    const payload = {
      ...formState
    }
    delete payload.toMail
    payload.toMail = emails
    const { data } = await instance.post('/mailer/bulkMailSend', payload)
    if (data.success) {
      setFormState(initialState)
      setEmails([])
      message.success('Sent successfully')
    } else {
      console.log('Something went wrong')
    }
  }

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })

    if (name === 'categoryType') {
      fetchTypes(value)
    }

    if (name === 'type') {
      fetchEmails(value)
    }
  }

  // Fetch types based on category
  const fetchTypes = async (value) => {
    let url = ''
    switch (value) {
      case '1':
        url = '/consumer/fetchConsumerType?status=1'
        break
      case '2':
        url = '/user/fetchUserType?status=1'
        break
      case '3':
        url = '/employee/fetchEmployeeType?status=1'
        break
      default:
        url = '/consumer/fetchConsumerType?status=1'
        break
    }
    const { data } = await instance.get(url)
    if (data.success) {
      const filteredData = data.data.map((itm) => (
        { name: itm.typeName, value: itm._id }
      ))
      setTypesList(filteredData)
    } else {
      console.log('Something went wrong')
    }
  }

  // fetch emails based on types
  const fetchEmails = async (id) => {
    try {
      const { data } = await instance.post('/mailer/fetchMailsByType', {
        categoryType: formState.categoryType,
        typeId: id
      })
      if (data.success) {
        const emailFiltered = data.data.map((itm) => (
          itm.mailId
        ))
        setEmails(emailFiltered)
      }
    } catch (e) {
      console.log(e.response.message)
    }
  }

  return (
        <div className='mainLayout'>
            <div className='headerLayout'>
              <div className='headerTitle'>
                <h1>Mailer</h1>
              </div>
            </div>
            <div className='contentLayout'>
              <div className='formLayout'>
                <form method="post" onSubmit={submitForm}>
                    <Select
                        changeHandle={changeHandle}
                        label="Select category"
                        defaultValue={formState.categoryType}
                        name="categoryType"
                        options={types}
                    />
                    <Select
                        changeHandle={changeHandle}
                        label="Select Type"
                        defaultValue={formState.type}
                        name="type"
                        options={typesList}
                    />
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

export default Mailer
