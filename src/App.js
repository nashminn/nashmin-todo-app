import logo from './logo.svg';
import './App.css';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { useState } from 'react';
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
  const addTodo = (newTodo)=>{
    setTodos(...todos, newTodo)
  }

  return (
    <div>
      <TodoForm addTodo={addTodo}/>
      <TodoList todoList={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;

// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React
//       </a>
//     </header>
//   </div>
// )
