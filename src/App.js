import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { useEffect, useState } from 'react';
import { uid } from 'uid';
import { Button } from 'react-bootstrap';

const todoss = [
  {
    id: uid(),
    title: "title 1",
    details: "oaisdjf aoisdfj oaisdfj"
  },
  {
    id: uid(),
    title: "title 2",
    details: "oaisdjf aoisdfj oaisdfj"
  },
  {
    id: uid(),
    title: "title 3",
    details: "oaisdjf aoisdfj oaisdfj"
  },
]

function App() {
  const [todos, setTodos] = useState(todoss) 
  const [populateData, setPopulateData] = useState({})
  const [resetFlag, setResetFlag] = useState(false)


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
  

  useEffect(()=>{
    // setPopulateData({})
  }, [resetFlag])


  return (
    <div>
      <TodoForm className="todo-form-main" addTodo={addTodo} 
          deleteTodo={deleteTodo} populateData={populateData} 
          setPopulateData={setPopulateData} resetFlag={resetFlag}/>
      <Button >Filter</Button> 
       {/* filter by priority, completion, duedate */}

      <TodoList className="todo-list-main" todoList={todos} 
          deleteTodo={deleteTodo} setTodos={setTodos} editTodo={editTodo}/>
    </div>
  );
}

export default App;

