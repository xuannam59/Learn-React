const TodoData = (props) => {
  console.log("Check props", props);

  const { name, address, data, todoList } = props;
  console.log("check valueInput: ", props);
  return (
    <div className="todo-data">
      <p>My name is {name}</p>
      <p>Learn React</p>
      <p>Watching Youtube</p>
      {JSON.stringify(props.todoList)}
    </div>
  );
}

export default TodoData;