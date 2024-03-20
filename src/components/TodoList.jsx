import { List, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import { uid } from 'uid'

export const TodoList = (props) => {
    const [todoList, setTodoList] =  useState(props.todoList? props.todoList: [])

// sort by title, priority, description, status
// filter by status, priority, dueDate
// search by title, details


    useEffect(()=>{
        setTodoList(props.todoList)
    }, [props])

    return (

      <List> 
          {todoList.map((todo)=>{
              return <ListItem key={todo.id}><TodoItem todo={todo}
                        deleteTodo={props.deleteTodo} editTodo={props.editTodo}/></ListItem>
          })}
          
      </List>
    )
}
