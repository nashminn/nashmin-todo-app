
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, IconButton } from '@mui/material'
import React, { useState } from 'react'



export const TodoItem = ({title, details}) => {
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
                
                <IconButton aria-label="delete" onClick={()=>{console.log("deleqqeq preqssqeqd")}}><DeleteIcon /></IconButton>
            </>
            <br/>
            <>
                {details}
            </>
            <br/>
            Due date
        </>
    </div>
  )
}
