import axios from 'axios'
import React, { useState } from 'react'

const SingleMailer = () => {
  const initialState = {
    toMail: '',
    subject: '',
    content: ''
  }

  const [formState, setFormState] = useState(initialState)
  const submitForm = async (e) => {
    e.preventDefault()
    const [success] = await axios.post('http://localhost:8000/v1/mailer/mailSend', formState)
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

  return (
        <div>
            <form method="post" onSubmit={submitForm}>
                <input type="email" name="toMail" onChange={changeHandle} value={formState.toMail} />
                <input type="text" name="subject" onChange={changeHandle} value={formState.subject} />
                <textarea name="content" onChange={changeHandle} value={formState.content}>

                </textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
  )
}

export default SingleMailer
