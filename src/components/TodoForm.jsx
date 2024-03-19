import { Button} from '@mui/material'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { uid } from 'uid'
import { Select } from './Select'

export const TodoForm = ({addTodo, deleteTodo, populateData}) => {
    const [todo, setTodo] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [startDate, setStartDate] = useState(new Date().toISOString())
    const [dueDate, setDueDate] = useState((new Date()).toISOString())

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [priority, setPriority] = useState('Low')

    useEffect(()=> {
      if(Object.keys(populateData).length !== 0)  {
        setShowForm(true)
        setTitle(populateData.title)
        setDetails(populateData.details)
        setPriority(populateData.priority)
        setStartDate(populateData.due)
        
      }
    }, [populateData])
  

    const onSave = (e)=> {
      e.preventDefault()
      console.log("before adding, due date: ", dueDate)
      if(Object.keys(populateData).length === 0)
        addTodo({...todo, id: uid(), created: (new Date()).toISOString(), due: dueDate})
      else {
        const created = populateData.created
        const updated = (new Date()).toISOString()
        const id = populateData.id

        const newTodo = {id, title, details, priority, created, updated, due: dueDate}
        deleteTodo(id)
        addTodo(newTodo)
      }
      setShowForm(false)
    }

    const onChangeHandler = (e)=> {
      todo[e.target.name] = e.target.value
      switch(e.target.name) {
        case 'title': 
          setTitle(e.target.value)
          break;
        case 'details':
          setDetails(e.target.value)
          break;
        case 'priority':
          setPriority(e.target.value)
          break;
        default:
          break;
      }
    }

    
  return (
    <div>
        {showForm && createPortal(<div>
            Title:      <input label="Title" name='title' fieldName='title' 
                          onChange={onChangeHandler} defaultValue={title}/><br/>
            Details:    <input label="Details" name='details' fieldName='details' 
                          onChange={onChangeHandler} defaultValue={details}/><br/> 
            Priority:   <Select fieldName='priority' name='priority' defaultValue={priority}
                        options={['High', 'Moderate', 'Low']} onChange={onChangeHandler} /><br/>
            Due Date:   <DatePicker showIcon name='due' selected={startDate}  
                        dateFormat="dd/MM/yyyy" 
                        onChange={async (date) => { 
                          console.log(date); 
                          await setDueDate(date.toISOString()); 
                          todo['due']=dueDate
                          setStartDate(date.toISOString())
                        } } /> 
                        <br/>
            <Button onClick={onSave}>Save</Button>
        </div>, document.body)}
        
        {!showForm && <Button onClick={()=>{setShowForm(true)}} >Add todo</Button>}
    </div>
  )
}


