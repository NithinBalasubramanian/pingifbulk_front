import axios from 'axios'
import React, { useState, useEffect } from 'react'
import ButtonComponent from '../../sharedComponent/ButtonComponent'
import Input from '../../sharedComponent/Input'
import TextAreaComponent from '../../sharedComponent/TextAreaComponent'
import { useHistory, useParams } from 'react-router'

const AddTeamTypeForm = () => {
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
    const { data } = await axios.post('http://localhost:8000/v1/team/addTeamType', formState)
    if (data.success) {
      setFormState(initialState)
      cancelBtn()
    } else {
      console.log('Something went wrong')
    }
  }

  const cancelBtn = () => {
    history.push('/team-type-management')
  }

  const updateForm = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(`http://localhost:8000/v1/team/updateTeamType/${id}`, formState)
    if (data.success) {
      setFormState(initialState)
      cancelBtn()
    } else {
      console.log('Something went wrong')
    }
  }

  const fetchDetails = async (reqId) => {
    const { data } = await axios.get(`http://localhost:8000/v1/team/fetchTeamTypeById/${reqId}`)
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
                <h1>{id !== '1' ? 'Update' : 'Add' } Team Type</h1>
            </div>
          </div>
          <div className='contentLayout'>
          <div className='formLayout'>
            <form method="post" onSubmit={id !== '1' ? updateForm : submitForm}>
              <Input changeHandle={changeHandle} label="Team Type" defaultValue={formState.typeName} name="typeName" type="text" />
              <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />
              <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={cancelBtn} />
              <ButtonComponent classname="button-submit" type="submit" label={id !== '1' ? 'Update' : 'Submit'} />
            </form>
          </div>
          </div>
        </div>
      }
      </>
  )
}

export default AddTeamTypeForm
