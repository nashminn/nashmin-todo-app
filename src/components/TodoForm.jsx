import { Button} from '@mui/material'

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { uid } from 'uid'
import { Select } from './Select'

export const TodoForm = ({addTodo}) => {
    const [todo, setTodo] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [startDate, setStartDate] = useState(new Date().toISOString())
    const [dueDate, setDueDate] = useState((new Date()).toISOString())
  

    const onSave = (e)=> {
      e.preventDefault()
      console.log("before adding, due date: ", dueDate)
      addTodo({...todo, id: uid(), created: (new Date()).toISOString(), due: dueDate})
      setShowForm(false)
    }

    const onChangeHandler = (e)=> {
      todo[e.target.name] = e.target.value
    }

    
  return (
    <div>
        {showForm && createPortal(<div>
            Title:      <input label="Title" name='title' fieldName='title' onChange={onChangeHandler}/><br/>
            Details:    <input label="Details" name='details' fieldName='details' onChange={onChangeHandler}/><br/> 
            Priority:   <Select fieldName='priority' name='priority' defaultValue='Low'
                        options={['High', 'Moderate', 'Low']} onChange={onChangeHandler} /><br/>
            Due Date:   <DatePicker howIcon name='due' selected={startDate}  
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


