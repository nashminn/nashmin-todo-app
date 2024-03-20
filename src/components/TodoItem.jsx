
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, Chip, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import '../css/todoitem.css'
import DeleteDialog from './DeleteDialog'



export const TodoItem = ({deleteTodo, editTodo, todo}) => {
    const [resetFlag, setResetFlag] = useState(false)
    
    // useEffect(()=> {

    // }, [resetFlag])
    

  return (
    <Container className="container-with-visible-border" >
        <Row>
            <Checkbox id={todo.id} onClick={(e)=>{ 
                    // console.log(e.target.checked)
                    todo.complete = e.target.checked?1: 0
                    setResetFlag(!resetFlag)
                    // console.log(todo) 
                }
                } checked={todo.complete===1} />
            
                
            {todo.title}
            <Container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton aria-label="edit" onClick={()=>{
                        // console.log("edit button clicked")
                        editTodo(todo)
                    }}>
                    <EditIcon />
                </IconButton>

                <DeleteDialog complete={todo.complete} deleteTodo={deleteTodo} todoId={todo.id}/>
                
                {/* <IconButton aria-label="delete" onClick={()=>{<DeleteDialog complete={todo.complete} id={todo.id}/> deleteTodo(todo.id)}}><DeleteIcon /></IconButton> */}
            </Container>
                
        </Row>
            
        <Row>
            {todo.details}<br/>
            <div >
            <Chip label={todo.complete===0?"Incomplete":"Complete"} color={todo.complete===0?'error':'success'} style={{ marginRight: '10px' }} />
            <Chip label={todo.priority} color={todo.priority==='High'?'error':todo.priority==='Medium'?'warning':'info'} style={{ marginRight: '10px' }}/>
            </div>
            
        </Row>

        <Row>
            {new Date(todo.due).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
        </Row>
    </Container>
  )
}
