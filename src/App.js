import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import useLocalStorage  from 'react-use-localstorage';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { useEffect, useState } from 'react';
import { uid } from 'uid';
import { Filter } from './components/Filter';
import { Button } from 'react-bootstrap';

const todoss = [
  {
    id: uid(),
    title: "title 1",
    complete: 0,
    details: "oaisdjf aoisdfj oaisdfj"
  },
  {
    id: uid(),
    title: "title 2",
    complete: 0,
    details: "oaisdjf aoisdfj oaisdfj"
  },
  {
    id: uid(),
    title: "title 3",
    complete: 0,
    details: "oaisdjf aoisdfj oaisdfj"
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
      
      <TodoForm className="todo-form-main" addTodo={addTodo} 
          deleteTodo={deleteTodo} populateData={populateData} 
          setPopulateData={setPopulateData} resetFlag={resetFlag}/>


      <Filter sendFilter={setFilter} /> 
      <Button onClick={()=>{
        setFilter({})
        setAlteredFlag(false)
        setAlteredTodos([])
        setResetFlag(!resetFlag)
      }}>Clear Filter</Button> 
       
       {/* filter by priority, completion, duedate */}

      {!alteredFlag &&   
      <TodoList className="todo-list-main" todoList={todos} 
          deleteTodo={deleteTodo} setTodos={setTodos} editTodo={editTodo}/>} 
      
      {alteredFlag &&
      <div>
        <TodoList className="todo-list-main" todoList={alteredTodos} 
          deleteTodo={deleteTodo} setTodos={setTodos} editTodo={editTodo}/>
      </div>}
    </div>
  );
}

export default App;

