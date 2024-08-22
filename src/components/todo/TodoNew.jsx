import { useState } from "react";

const TodoNew = (props) => {
  const { addNewTodo } = props
  const [valueInput, setValueInput] = useState("XuanNam");
  const handleClick = () => {
    addNewTodo(valueInput);
  }

  const handleChange = (name) => {
    setValueInput(name);
  }
  return (
    <div className="todo-new">
      <input
        type="text"
        placeholder="Enter Text"
        onChange={(event) => handleChange(event.target.value)}
      />
      <button
        onClick={handleClick}
      >App</button>
      <div>{`My text input is : ${valueInput}`}</div>
    </div>
  );
}

export default TodoNew;