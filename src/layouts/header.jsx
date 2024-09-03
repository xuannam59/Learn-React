import { Link } from "react-router-dom";
import { Menu } from "antd";
import { AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const Header = () => {
  const [current, setCurrent] = useState('home');
  const { user } = useContext(AuthContext);
  console.log(user);

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
    },
    ...(!user.id ? [{
      label: <Link to={"/login"}>Login</Link>,
      key: 'login',
      icon: <LoginOutlined />
    }] : []),
    ...(user.id ? [{
      label: `Welcome ${user.fullName}`,
      key: 'welcome',
      icon: <AliwangwangOutlined />,
      children: [
        {
          label: "Logout",
          key: 'register',
          icon: <LogoutOutlined />
        }
      ]
    }] : []),

  ];


  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
}

export default Header;