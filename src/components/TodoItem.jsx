
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, IconButton } from '@mui/material'
import React, { useState } from 'react'



export const TodoItem = ({id, title, details, due, deleteTodo}) => {
    // const uid = uid()

  return (
    <div>
        <Checkbox />
        <>
            <>
                {title}
                <IconButton aria-label="edit" onClick={()=>{console.log("edit todo")}}>
                    <EditIcon />
                </IconButton>
                
                <IconButton aria-label="delete" onClick={()=>deleteTodo(id)}><DeleteIcon /></IconButton>
            </>
            <br/>
            <>
                {details}
            </>
            <br/>
            Due date: {due}
        </>
    </div>
  )
}
