import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import "./styles/global.css"
import UserPage from './pages/user.jsx';
import ProductPage from './pages/product.jsx';

const router = createBrowserRouter([
  {

    path: "/",
    element: <App />,
    children: [
      {
        path: "/user",
        element: <UserPage />
      },
      {
        path: "/product",
        element: <ProductPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
