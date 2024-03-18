import { List, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import { uid } from 'uid'

export const TodoList = (props) => {
    const [todoList, setTodoList] =  useState(props.todoList? props.todoList: [])

    useEffect(()=>setTodoList(todoList), todoList)

    return (

      <List> 
          {todoList.map((todo)=>{
              return <ListItem id={todo.id}><TodoItem id={todo.id} title={todo.title} details={todo.details}/></ListItem>
          })}
          
      </List>
    )
}
