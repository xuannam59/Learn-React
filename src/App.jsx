import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import "./components/todo/todo.css"
import reactLogo from "./assets/react.svg"
import { useState } from "react"



const App = () => {
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const [todoList, setTodoList] = useState([]);

  const addNewTodo = (name) => {
    const newTodo = {
      id: generateRandomNumber(1, 1000000),
      name: name
    }
    setTodoList([...todoList, newTodo]);
  }

  const deleteTodo = (id) => {
    const newTodo = todoList.filter((item) => {
      return item.id !== id
    });
    setTodoList(newTodo)
  }

  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo list</div>
        <TodoNew
          addNewTodo={addNewTodo}
        />

        {todoList.length > 0 ?  /* Cách 1 */
          <TodoData
            todoList={todoList}
            deleteTodo={deleteTodo}
          />
          :
          <div className="todo-image">
            <img src={reactLogo} alt="Logo" className="logo" />
          </div>
        }

        {/* Cách 2
        {todoList.length > 0 &&
          <TodoData
            todoList={todoList}
          />
        }
        {todoList.length === 0 &&
          <div className="todo-image">
            <img src={reactLogo} alt="Logo" className="logo" />
          </div>
        } */}
      </div>
    </>
  )
}

export default App
