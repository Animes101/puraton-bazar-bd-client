import App from "../App";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import { createBrowserRouter } from "react-router-dom";
import NotFound404 from "../Pages/NotFound404";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },

    ],
  },
  {
    path:'*',
    element: <NotFound404 />
  }
]);

export default router;
