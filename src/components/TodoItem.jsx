
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import '../css/todoitem.css'



export const TodoItem = ({deleteTodo, editTodo, todo}) => {
    

  return (
    <Container className="container-with-visible-border" >
        <Checkbox id={todo.id+"check"}/>
        <>
            <>
                {todo.title}
                <IconButton aria-label="edit" onClick={()=>{
                        console.log("edit button clicked")
                        editTodo(todo)
                    }}>
                    <EditIcon />
                </IconButton>
                
                <IconButton aria-label="delete" onClick={()=>deleteTodo(todo.id)}><DeleteIcon /></IconButton>
            </>
            <br/>
            <>
                {todo.details}<br/>
                {todo.priority}
            </>
            <br/>
            Due date: {todo.due}
        </>
    </Container>
  )
}
