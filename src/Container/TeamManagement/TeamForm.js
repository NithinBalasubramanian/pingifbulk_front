import React, { useEffect, useState } from 'react'
import ButtonComponent from '../../Component/sharedComponent/ButtonComponent'
import { useHistory, useParams } from 'react-router'
import TextAreaComponent from '../../Component/sharedComponent/TextAreaComponent'
import Input from '../../Component/sharedComponent/Input'
import Select from '../../Component/sharedComponent/Select'
import instance from '../../Api_service'
import { message } from 'antd'

const TeamForm = () => {
  const initialState = {
    teamName: '',
    description: '',
    teamTypeId: ''
  }
  const history = useHistory()
  let defaultId = ''
  const { id } = useParams()

  if (id) {
    defaultId = id
  }

  const [formId] = useState(defaultId)
  const [formState, setFormState] = useState(initialState)
  const [teamTypeList, setTeamTypeList] = useState([])

  useEffect(() => {
    fetchTeamType()
    if (formId !== '1') {
      fetchTeamData()
    }
  }, [formId])

  const changeHandle = (e) => {
    const { name, value } = e.target
    setFormState(prevState => {
      return { ...prevState, [name]: value }
    })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    if (formId === '1') {
      const { data } = await instance.post('/team/addTeam', formState)
      if (data.success) {
        message.success(data.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    } else {
      const { data } = await instance.post(`/team/teamUpdate/${formId}`, formState)
      if (data.success) {
        message.success(data.msg)
        setFormState(initialState)
        cancelBtn()
      } else {
        console.log('Something went wrong')
      }
    }
  }

  const cancelBtn = () => {
    history.push('/team-management')
  }

  const fetchTeamType = async () => {
    const { data } = await instance.get('/team/fetchTeamTypes?search=""&status=1')
    if (data.success) {
      const filterOption = data.data.map((itm) => (
        { value: itm._id, name: itm.typeName }
      ))
      setTeamTypeList(filterOption)
    } else {
      console.log('Something went wrong')
    }
  }

  const fetchTeamData = async () => {
    const { data } = await instance.get(`/team/listTeam/${formId}`)
    if (data.success) {
      setFormState(data.data[0])
    } else {
      console.log('Something went wrong')
    }
  }

  return (
    <div className='mainLayout'>
      <div className='headerLayout'>
        <div className='headerTitle'>
            <h1>{formId === '1' ? 'Add' : 'Update'} Team </h1>
        </div>
      </div>
      <div className='contentLayout'>
        <div className='formLayout'>
          <form method="post" onSubmit={submitForm}>
          <Select
                changeHandle={changeHandle}
                label="Team Type"
                defaultValue={formState.teamTypeId}
                name="teamTypeId"
                options={teamTypeList}
            />
            <Input
              changeHandle={changeHandle}
              label="Team Name"
              defaultValue={formState.teamName}
              name="teamName"
              type="text"
            />
            <TextAreaComponent name="description" changeHandle={changeHandle} defaultValue={formState.description} label="Description" rows="10" />
            <ButtonComponent classname="button-submit button-cancel" type="button" label="Cancel" changeHandler={cancelBtn} />
            <ButtonComponent classname="button-submit" type="submit" label="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default TeamForm
