import { Link, useNavigate } from "react-router-dom";
import { Menu, message } from "antd";
import { AliwangwangOutlined, BookOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
import { logoutUserApi } from "../services/api.service";

const Header = () => {
  const [current, setCurrent] = useState('home');
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleClick = async () => {
    const res = await logoutUserApi();

    if (res.data) {
      // clear data
      localStorage.removeItem("access_token");
      setUser({
        id: "",
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
      });
      message.success(res.data);

      // redirect
      navigate("/");
    }
  }

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
          label: <span onClick={handleClick}>Logout</span>,
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