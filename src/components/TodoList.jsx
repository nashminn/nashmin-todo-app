import { List, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import { uid } from 'uid'

export const TodoList = (props) => {
    const [todoList, setTodoList] =  useState(props.todoList === null? props.todoList: [])

// sort by title, priority,
// filter by status, priority, dueDate - ///TODO: due date filter
// search by title, details - done


    useEffect(()=>{
        refreshList()
    }, [props.todoList])

    const refreshList = ()=>{
        setTodoList(props.todoList)
    }

    return (

      <List> 
          {todoList.map((todo)=>{
              return <ListItem key={todo.id}><TodoItem todo={todo}
                        deleteTodo={props.deleteTodo} editTodo={props.editTodo}/></ListItem>
          })}
          
      </List>
    )
}
