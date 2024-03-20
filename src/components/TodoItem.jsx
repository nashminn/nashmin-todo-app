
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import '../css/todoitem.css'



export const TodoItem = ({deleteTodo, editTodo, todo}) => {
    const [resetFlag, setResetFlag] = useState(false)
    
    useEffect(()=> {

    }, [resetFlag])
    

  return (
    <Container className="container-with-visible-border" >
        <Checkbox id={todo.id} onClick={(e)=>{ 
            console.log(e.target.checked)
                todo.complete = e.target.checked?1: 0
                setResetFlag(!resetFlag)
                console.log(todo) 
                }
            } checked={todo.complete===1} 
            />
        <>
            <>
                {todo.title}
                <IconButton aria-label="edit" onClick={()=>{
                        // console.log("edit button clicked")
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
