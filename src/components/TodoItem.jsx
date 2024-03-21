import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Checkbox, Chip, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/todoitem.css'
import DeleteDialog from './DeleteDialog'

export const TodoItem = ({ deleteTodo, editTodo, todo }) => {
    const [resetFlag, setResetFlag] = useState(false)

    return (
        <Container fluid className={`container-with-visible-border ${todo.complete === 1 ? 'todo-checked' : ''}`}>
            <Row className="align-items-center">
                <Col >
                    <Checkbox
                        id={todo.id}
                        onClick={(e) => {
                            todo.complete = e.target.checked ? 1 : 0
                            setResetFlag(!resetFlag)
                        }}
                        checked={todo.complete === 1}
                    />{todo.title}
                </Col>
                <Col className="d-flex justify-content-end">
                    <IconButton aria-label="edit" onClick={() => editTodo(todo)}>
                        <EditIcon />
                    </IconButton>
                    <DeleteDialog complete={todo.complete} deleteTodo={deleteTodo} todoId={todo.id} />
                </Col>
            </Row>

            <Row styles={{marginBottom: '20px', marginTop: '10px', marginLeft: '100px' , marginBottom:'15px'}}>
                <Col >{todo.details}</Col>
            </Row>

            <Row>
                <Col>
                    <Chip
                        label={todo.complete === 0 ? "Incomplete" : "Complete"}
                        color={todo.complete === 0 ? 'error' : 'success'}
                        style={{ marginRight: '10px' }}
                    />
                    <Chip
                        label={todo.priority}
                        color={todo.priority === 'High' ? 'error' : todo.priority === 'Medium' ? 'warning' : 'info'}
                        style={{ marginRight: '10px' }}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Chip
                        label={new Date(todo.due).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                        style={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                </Col>
            </Row>
        </Container>
    )
}
