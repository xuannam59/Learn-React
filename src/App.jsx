import TodoData from "./components/todo/TodoData"
import TodoNew from "./components/todo/TodoNew"
import "./components/todo/todo.css"
import reactLogo from "./assets/react.svg"

const App = () => {
  const name = "Xuan Nam";
  const age = 22;
  const data = {
    address: "Bac Ninh",
  }

  const addNewTodo = (name) => {
    alert(`Call me ${name} !`);
  }

  return (
    <>
      <div className="todo-container">
        <div className="todo-title">Todo list</div>
        <TodoNew
          addNewTodo={addNewTodo}
        />
        <TodoData
          name={name}
          age={age}
          data={data}
        />
        <div className="todo-image">
          <img src={reactLogo} alt="Logo" className="logo" />
        </div>
      </div>
    </>
  )
}

export default App
