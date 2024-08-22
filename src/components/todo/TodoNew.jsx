import { useState } from "react";

const TodoNew = (props) => {
  const { addNewTodo } = props
  // addNewTodo("Xuan Nam");
  const [valueInput, setValueInput] = useState("XuanNam");
  const handleClick = () => {
    alert(`Click me `);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    console.log(event.target.value);
    setValueInput(value);
  }
  return (
    <div className="todo-new">
      <input
        type="text"
        placeholder="Enter Text"
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
      >App</button>
      <div>{`Change content : ${valueInput}`}</div>
    </div>
  );
}

export default TodoNew;