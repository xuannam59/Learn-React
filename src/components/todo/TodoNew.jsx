const TodoNew = (props) => {
  const { addNewTodo } = props

  addNewTodo("Xuan Nam");
  return (
    <div className="todo-new">
      <input type="text" placeholder="Enter Text" />
      <button>App</button>
    </div>
  );
}

export default TodoNew;