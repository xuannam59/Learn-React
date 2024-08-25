import { Link, NavLink } from "react-router-dom";
import "./header.css"

const Header = () => {
  return (
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/User">User</NavLink></li>
      <li><NavLink to="/Product">Product</NavLink></li>
    </ul>
  );
}

export default Header;