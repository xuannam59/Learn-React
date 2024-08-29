import { Link, NavLink } from "react-router-dom";
import { Menu } from "antd";
import { BookOutlined, HomeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useState } from "react";

const Header = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: <Link to={"/"}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/users"}>Users</Link>,
      key: 'users',
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link to={"/books"}>Books</Link>,
      key: 'book',
      icon: <BookOutlined />,
    }
  ];

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
}

export default Header;