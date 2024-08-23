import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import "./components/todo/todo.css"
import reactLogo from "./assets/react.svg"
import { useState } from "react"

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const App = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Learn React" },
    // { id: 2, name: "Watching Youtube" }
  ])
  const addNewTodo = (name) => {
    const newTodo = {
      id: generateRandomNumber(1, 1000000),
      name: name
    }

    setTodoList([...todoList, newTodo]);
  }

  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo list</div>
        <TodoNew
          addNewTodo={addNewTodo}
        />
        <TodoData
          todoList={todoList}
        />
        <div className="todo-image">
          <img src={reactLogo} alt="Logo" className="logo" />
        </div>
      </div>
    </>
  )
}

export default App
