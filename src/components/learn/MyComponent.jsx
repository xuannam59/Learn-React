// JSX : 1 parent
// Fragment

import "./style.css"

const MyComponent = () => {
  return (
    <>
      <div>Xuan Nam & update</div>
      <div
        style={{ borderRadius: "3px" }}
        className="child"
      >child</div>
    </>
  );
}

export default MyComponent;