import { useState } from "react";

const TodoNew = (props) => {
  const { addNewTodo } = props
  const [valueInput, setValueInput] = useState("XuanNam");
  const handleClick = () => {
    if (valueInput.length > 0) {
      addNewTodo(valueInput);
      setValueInput("");
    }
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
        value={valueInput}
      />
      <button
        onClick={handleClick}
      >App</button>
      <div>{`My text input is : ${valueInput}`}</div>
    </div>
  );
}

export default TodoNew;