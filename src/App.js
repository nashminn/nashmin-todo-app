import logo from './logo.svg';
import './App.css';
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

  const addTodo = async (newTodo) => {
    await setTodos((prevTodos) => {
      const newTodos = [...prevTodos, newTodo];
      return newTodos; 
    });
  }
  

  useEffect(()=>{
    setTodos(todos);
  }, [todos])

  return (
    <div>
      <TodoForm addTodo={addTodo}/>
      <TodoList todoList={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

