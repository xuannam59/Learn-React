const TodoNew = (props) => {
  const { addNewTodo } = props
  // addNewTodo("Xuan Nam");
  const handleClick = () => {
    alert(`Click me `);
  }

  const handleChange = (event) => {
    console.log(event.target.value);
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
    </div>
  );
}

export default TodoNew;