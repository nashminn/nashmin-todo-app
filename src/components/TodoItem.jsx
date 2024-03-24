import EditIcon from '@mui/icons-material/Edit'
import { Button, Card, Checkbox, Chip, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../css/todoitem.css'
import DeleteDialog from './DeleteDialog'

export const TodoItem = ({ deleteTodo, editTodo, todo }) => {
    const [resetFlag, setResetFlag] = useState(false)


        return (
            <Card style={{marginLeft: '10px', marginRight: '10px', marginTop: '10px', marginBottom: '5px'}} >
            <Container fluid className={`container-with-visible-border ${todo.complete === 1 ? 'todo-checked' : ''}`}>
                <Row className="align-items-center">
                    <Col >
                        <Checkbox
                            id={todo.id}
                            onClick={(e) => {
                                todo.complete = e.target.checked ? 1 : 0
                                setResetFlag(!resetFlag)
                                editTodo(todo, false)
                            }}
                            checked={todo.complete === 1}
                        />{todo.title}
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <IconButton aria-label="edit" onClick={() => editTodo(todo, true)}>
                            <EditIcon />
                        </IconButton>
                        <DeleteDialog complete={todo.complete} deleteTodo={deleteTodo} todoId={todo.id} />
                    </Col>
                </Row>

                <Row styles={{marginTop: '10px', marginLeft: '100px' , marginBottom:'15px'}}>
                    <Container style={{minHeight: '100px',}}>{todo.details}</Container>
                </Row>

                {/* <Row>
                    
                </Row> */}

                <Row>
                    <Col>
                        <Chip
                            label={new Date(todo.due).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                            style={{ marginBottom: '5px', marginRight: '5px' }}
                        />
                    {/* </Col>
                    <Col> */}
                        <Chip
                            label={todo.complete === 0 ? "Incomplete" : "Complete"}
                            color={todo.complete === 0 ? 'error' : 'success'}
                            style={{ marginBottom: '5px', marginRight: '5px', marginLeft: '5px' }}
                        />
                    {/* </Col>
                    <Col> */}
                        <Chip
                            label={todo.priority}
                            color={todo.priority === 'High' ? 'error' : todo.priority === 'Medium' ? 'warning' : 'info'}
                            style={{ marginBottom: '5px', marginRight: '10px', marginLeft: '5px' }}
                        />
                    </Col>
                </Row>
            </Container>
            </Card>
        );
    

}
