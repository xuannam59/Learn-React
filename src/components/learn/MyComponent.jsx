// JSX : 1 parent
// Fragment

import "./style.css"

const MyComponent = () => {
  // const xuanNam = 12;// number
  // const xuanNam = "Hello"; // String
  const xuanNam = [1, 2, 3];
  // const xuanNam = {
  //   name: "Xuan Nam",
  //   age: "22"
  // }
  return (
    <>
      <div>{JSON.stringify(xuanNam)} Xuan Nam & update</div>
      <div
        style={{ borderRadius: "3px" }}
        className="child"
      >child</div>
    </>
  );
}

export default MyComponent;