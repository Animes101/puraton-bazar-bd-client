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
import Details from "../Pages/Details";
import Privet from "../Pages/Privet";
import UserHome from "../Pages/UserHome";
import Payment from "../Pages/Payment";
import AdminAllUsers from "../Pages/AdminAllUsers";
import AllProducts from "../Pages/AllProducts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/category", element: <Category /> },
      { path: "/contact", element: <Contact /> },
      { 
        path: "/dashboard",
        element: <Privet><Dashboard /></Privet>,
        children:[
          { path: "/dashboard/home", element: <UserHome /> },
          { path: "/dashboard/payment", element: <Payment /> },
          { path: "/dashboard/profile", element: <UserHome /> },
          { path: "/dashboard/home", element: <UserHome /> },
          { path: "/dashboard/home", element: <UserHome /> },
          { path: "/dashboard/all-users", element: <AdminAllUsers /> },
          {path: "/dashboard/products", element:<AllProducts />}
        ]
      
      },
      { path: "/cart", element: <Privet><Cart /> </Privet>},
      {path:'/category/:id', element:<Privet><Details /></Privet>}
    ],
    
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/register',
    element:<Register />

  },
  {
    path: "*",
    element: <NotFound404 />,
  },
]);

export default router;
