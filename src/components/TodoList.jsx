import { Grid, List, ListItem } from '@mui/material'
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

    //   <List> 
    //       {todoList.map((todo)=>{
    //           return <ListItem key={todo.id}><TodoItem todo={todo}
    //                     deleteTodo={props.deleteTodo} editTodo={props.editTodo}/></ListItem>
    //       })}
          
    //   </List>
        <Grid container direction="row" justifyContent="center">
            {todoList.map((todo)=>{
                // xs = 4 for 3 cards, xs = 6 for 2 cards
                return (<Grid item xs={4} style={{marginBottom: '10px'}}>
                <TodoItem todo={todo}
                         deleteTodo={props.deleteTodo} editTodo={props.editTodo}/>

                </Grid>);
            })}
            
            {/* <Grid item xs={4}>
                <Content />
            </Grid>
            <Grid item xs={4}>
                <Content />
            </Grid> */}
            {/* <Grid item xs={6}>
                <Content />

            </Grid>
            <Grid item xs={6}>
                <Content />
            </Grid> */}
        </Grid>
    )
}
