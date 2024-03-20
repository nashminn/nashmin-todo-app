import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import useLocalStorage  from 'react-use-localstorage';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { useEffect, useState } from 'react';
import { uid } from 'uid';
import { Filter } from './components/Filter';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AppliedFilter } from './components/AppliedFilter';

const todoss = [
  {
    id: uid(),
    title: "title 1",
    complete: 0,
    priority: "Low",
    details: "oaisdjf aoisdfj oaisdfj",
    due: new Date().toISOString()
  },
  {
    id: uid(),
    title: "title 2",
    complete: 0,
    priority: "Medium",
    details: "oaisdjf aoisdfj oaisdfj",
    due: new Date().toISOString()
  },
  {
    id: uid(),
    title: "title 3",
    complete: 0,
    priority: "High",
    details: "oaisdjf aoisdfj oaisdfj",
    due: new Date().toISOString()
  },
]

function App() {
  // const [todoList, setTodoList] = useLocalStorage('todoList', [])

  const [todos, setTodos] = useState(todoss) 
  const [alteredTodos, setAlteredTodos] = useState([])
  const [alteredFlag, setAlteredFlag] = useState(false)
  const [populateData, setPopulateData] = useState({})
  const [resetFlag, setResetFlag] = useState(false)
  const [filter, setFilter] = useState({})

  useEffect(()=>{

  }, [resetFlag])

  useEffect(()=>{
    if(Object.keys(filter).length === 0) {
      setAlteredFlag(false)
      setAlteredTodos([])
      setResetFlag(!resetFlag)
    }
    actualFilter()
  }, [filter])

  const actualFilter = ()=>{
    let altList = [...todos]
    if(Object.keys(filter).length > 0) {
      if(filter.complete !== undefined) {
        altList = altList.filter((x)=>{
          return x.complete === filter.complete
        })
      }

      if(filter.priority !== undefined && filter.priority.length > 0) {
        altList = altList.filter((x)=>{
          return filter.priority.includes(x.priority)
        })
        console.log("filtered based on priority: ")
        console.log(altList)
      }
      
      setAlteredTodos(altList)
      console.log(altList)
      setAlteredFlag(true)
      setResetFlag(!resetFlag)
    }
  }


  const addTodo = async (newTodo) => {
    setTodos((oldTodos) => {
      const newTodos = [newTodo, ...oldTodos];
      setPopulateData({})
      return newTodos; 
    });
  }

  const deleteTodo = async (deleteId) => {
    setTodos((todos)=> {
      return todos.filter(todo=>todo.id !== deleteId)
    })
  }

  const editTodo = async (dataToEdit) => {
    // console.log("in app.js datatoedit priority: " +  dataToEdit.priority + "what")
    setPopulateData(dataToEdit)
    setResetFlag(!resetFlag)
  }


  return (
    <div>
      
      <Container row className='row justify-content-center'>
      <h2 align="center" >Todo List</h2>
        <Row className="justify-content-center">
          <Col md={6}>
            <TodoForm className="todo-form-main" addTodo={addTodo} 
                deleteTodo={deleteTodo} populateData={populateData} 
                setPopulateData={setPopulateData} resetFlag={resetFlag}/>
          </Col>

          <Col md={6} >
            <Filter className='row justify-content-center' sendFilter={setFilter} /> 
          </Col>
        

        </Row>
      </Container>

       
      <AppliedFilter filter={filter} modifyFilter={setFilter}/>

      {!alteredFlag &&   
      <TodoList className="todo-list-main" todoList={todos} 
          deleteTodo={deleteTodo} setTodos={setTodos} editTodo={editTodo}/>} 
      
      {alteredFlag &&
        <TodoList className="todo-list-main" todoList={alteredTodos} 
          deleteTodo={deleteTodo} setTodos={setTodos} editTodo={editTodo}/>
      }

    </div>
  );
}

export default App;

{/* <Button onClick={()=>{
          setFilter({})
          setAlteredFlag(false)
          setAlteredTodos([])
          setResetFlag(!resetFlag)
        }}>Clear Filter</Button>  */}