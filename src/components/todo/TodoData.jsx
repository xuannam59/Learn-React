const TodoData = (props) => {
  const { todoList } = props;
  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        return (
          <p className="todo-item">
            <div>{item.name}</div>
            <button>Delete</button>
          </p>
        )
      })}
      {JSON.stringify(todoList)}
    </div>
  );
}

export default TodoData;