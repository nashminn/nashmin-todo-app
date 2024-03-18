import { Button, Select } from '@mui/material'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'
import { Biotech } from '@mui/icons-material'
import { uid } from 'uid'

export const TodoForm = ({addTodo}) => {
    const [todo, setTodo] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
  

    const onSave = (e)=> {
      e.preventDefault()
      addTodo({...todo, id: uid()})
      setShowForm(false)
    }
  return (
    <div>
        {showForm && createPortal(<div className='overlay'>
            Title:      <input label="Title" fieldName='title'/><br/>
            Details:    <input /><br/>
            Priority:   <select label='Priority' fieldName='priority' defaultValue='Low'
                        options={['High', 'Moderate', 'Low']} onchange={(e)=>console.log(e.target.value)} /><br/>
            Due Date:   <DatePicker howIcon selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date) } /> <br/>
            <Button onClick={onSave}>Save</Button>
        </div>, document.body)}
        
        {!showForm && <Button onClick={()=>{setShowForm(true)}} onChange={(date)=>setStartDate(date)}>Add todo</Button>}
    </div>
  )
}


