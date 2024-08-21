const TodoData = (props) => {
  console.log("Check props", props);

  const { name, address, data } = props;
  return (
    <div className="todo-data">
      <p>My name is {name}</p>
      <p>Learn React</p>
      <p>Watching Youtube</p>
    </div>
  );
}

export default TodoData;