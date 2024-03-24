import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import useLocalStorage  from 'react-use-localstorage';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import React, { useEffect, useState } from 'react';
import { uid } from 'uid';
import { Filter } from './components/Filter';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AppliedFilter } from './components/AppliedFilter';
import ReactSwitch from 'react-switch';
import { MockData } from './MockData';

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

  const [todos, setTodos] = useState([]) 
  const [alteredTodos, setAlteredTodos] = useState([])
  const [alteredFlag, setAlteredFlag] = useState(false)
  const [populateData, setPopulateData] = useState({})
  const [resetFlag, setResetFlag] = useState(false)
  const [filter, setFilter] = useState({})

  const [mockDataUse, setMockDataUse] = useState(true)


  useEffect(()=>{
    if(mockDataUse === false) {
      const stored = localStorage.getItem('todoList')
      if(stored === null) {
        setTodos([])
      } else {
        setTodos(JSON.parse(stored))
      }
    } else {
      setTodos(MockData())
    }
    setResetFlag(!resetFlag) 
  }, [mockDataUse])

  useEffect(() => {
    
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
        // console.log("filtered based on priority: ")
        // console.log(altList)
      }

      if(filter.due !== undefined) {
        if(filter.due === 1) {
          // ascending
          altList = altList.sort((a, b) => new Date(a.due) - new Date(b.due))
        } else {
          // descending
          altList = altList.sort((a, b) => new Date(b.due) - new Date(a.due))
        }
      }

      if(filter.created !== undefined) {
        if(filter.created === 1) {
          // ascending
          altList = altList.sort((a, b)=> new Date(a.created) - new Date(b.created))
        } else {
          // descending
          altList = altList.sort((a, b) => new Date(b.created) - new Date(a.created))
        }
      }
      
      setAlteredTodos(altList)
      // console.log(altList)
      setAlteredFlag(true)
      setResetFlag(!resetFlag)
    }
  }


  const addTodo = async (newTodo) => {
    setTodos((oldTodos) => {
      const newTodos = [newTodo, ...oldTodos];
      setPopulateData({})
      if(!mockDataUse) {
        // console.log("no use of mock data found")
        localStorage.setItem('todoList', JSON.stringify(newTodos))
      }
      return newTodos; 
    });
    
  }

  const deleteTodo = async (deleteId) => {
    setTodos((todos)=> {
      const left = todos.filter(todo=>todo.id !== deleteId)

      if(mockDataUse === false) {
        localStorage.setItem('todoList', JSON.stringify(left))
      }
  
      return left
    })
  }

  const editTodo = async (dataToEdit, openModal) => {
    // console.log("in app.js datatoedit priority: " +  dataToEdit.priority + "what")
    if(openModal) {
      setPopulateData(dataToEdit)
      setResetFlag(!resetFlag)
    } else {
      const localList = todos.filter((x)=>{
        return x.id !== dataToEdit.id
      })
      setTodos([dataToEdit, ...localList])
      if(!mockDataUse) {
        localStorage.setItem('todoList', JSON.stringify(todos))
      } 
      
    }
    
  }


  return (
    <div>
      
      <Container row >
      <h2 align="center" style={{marginTop: '5px'}}>Todo List</h2>
        <Row className="justify-content-center">
          <Col >
            <TodoForm className="todo-form-main" addTodo={addTodo} 
                deleteTodo={deleteTodo} populateData={populateData} 
                setPopulateData={setPopulateData} resetFlag={resetFlag}/>
          </Col>

          <Col  >
            <Filter className='justify-content-center' sendFilter={setFilter} /> 
          </Col>

          <Col className='d-flex justify-content-center align-items-center' >
          <div className="input-group rounded">
            <input id='search' type="text" className="form-control rounded" 
                    placeholder="Search title or details" aria-label="Search" 
                    aria-describedby="search-addon" onChange={ (e)=>{
                      // console.log(e.target.value)
                      if(e.target.value.trim().length === 0) {
                        setAlteredFlag(false)
                        setAlteredTodos([])
                      } else {
                        setAlteredFlag(true)
                      }

                      const searchResult = ()=>{
                        return todos.filter((x) => {
                          return ( x.title.toLowerCase().includes(e.target.value) || x.details.toLowerCase().includes(e.target.value))
                        })
                      }

                      setAlteredFlag(true)
                      setAlteredTodos(searchResult())
                    }}/>
            <datalist id='search'>{}</datalist>
          </div>
          </Col>
          
          <Col className='d-flex justify-content-center align-items-center'>
            <React.Fragment >
            Mock data: <ReactSwitch checked={mockDataUse} onChange={()=>{
              setMockDataUse(!mockDataUse)
            }}/>
            </React.Fragment>
          </Col>
        

        </Row>
      </Container>

      <br/> 
      <AppliedFilter filter={filter} modifyFilter={setFilter}/>
      <br/>

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