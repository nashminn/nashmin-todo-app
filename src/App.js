import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { useEffect, useState } from 'react';
import { uid } from 'uid';

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
  {
    id: uid(),
    title: "title 4",
    details: "oaisdjf aoisdfj oaisdfj"
  },
]

function App() {
  const [todos, setTodos] = useState(todoss) 
  const [populateData, setPopulateData] = useState({})

  const clearPopulateData = () => {
    setPopulateData({})
  }

  const addTodo = async (newTodo) => {
    setTodos((oldTodos) => {
      const newTodos = [...oldTodos, newTodo];
      clearPopulateData()
      return newTodos; 
    });
  }

  const deleteTodo = async (deleteId) => {
    setTodos((todos)=> {
      return todos.filter(todo=>todo.id !== deleteId)
    })
  }

  const editTodo = async (dataToEdit) => {
    console.log("in app.js datatoedit priority: " +  dataToEdit.priority + "what")
    setPopulateData(dataToEdit)
  }
  

  useEffect(()=>{
    setTodos(todos);
  }, [todos, populateData])

  return (
    <div>
      <TodoForm addTodo={addTodo} deleteTodo={deleteTodo} populateData={populateData}/>
      <TodoList todoList={todos} deleteTodo={deleteTodo} setTodos={setTodos} editTodo={editTodo}/>
    </div>
  );
}

export default App;

