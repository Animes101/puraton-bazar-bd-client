import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import Category from "../Pages/Category";
import Contact from "../Pages/Contact";
import Dashboard from "../Pages/Dashboard";
import Cart from "../Pages/Cart";
import NotFound404 from "../Pages/NotFound404";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category", element: <Category /> },
      { path: "/contact", element: <Contact /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/cart", element: <Cart /> },
      {path:'/login' , element:<Login />},
      {path:'/register', element:<Register />}
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);

export default router;
