
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import '../css/todoitem.css'



export const TodoItem = ({id, title, details, due, deleteTodo, editTodo, todo}) => {
    // const containerStyle = {
    //     border: '1px solid #ced4da', // Border color
    //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Shadow effect
    //   };

  return (
    <Container className="container-with-visible-border" >
        <Checkbox />
        <>
            <>
                {title}
                <IconButton aria-label="edit" onClick={()=>{
                        console.log("to do priority" + todo.priority)
                        editTodo(todo)
                    }}>
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
    </Container>
  )
}
