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
import AdminRoute from "../Pages/AdminRoute";
import AdminAddItem from "../Pages/AdminAddItem";
import AdminUpdateProduct from "../Pages/AdminUpdateProduct";
import UserProfile from "../Pages/UserProfile";
import AdminHome from "../Pages/AdminHome";
import AdminProfile from "../Pages/AdminProfile";
import AdminPaymentHistory from "../Pages/AdminPaymentHistory";
import PaymentSuccess from "../Components/PaymentSuccess";
import PaymentFailed from "../Components/PaymentFaield";
import PaymentSSL from "../Pages/PaymentSSL";
import DashboardLanding from "../Components/DashboardLanding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "category", element: <Category /> },
      { path: "contact", element: <Contact /> },

      {
        path: "dashboard",
        element: (
          <Privet>
            <Dashboard />
          </Privet>
        ),
        children: [
          // ⭐ Default Dashboard Route: User/Admin auto detect inside Dashboard.jsx
          { index: true, element: <DashboardLanding /> },

          // 🟢 User Routes
          { path: "home", element: <UserHome /> },
          { path: "payment", element: <Payment /> },
          { path: "profile", element: <UserProfile /> },
          { path: "paymentSSL", element: <Privet><PaymentSSL /></Privet> },

          // 🔴 Admin Routes
          { path: "adminHome", element: <AdminRoute><AdminHome /></AdminRoute> },
          { path: "all-users", element: <AdminRoute><AdminAllUsers /></AdminRoute> },
          { path: "products", element: <AdminRoute><AllProducts /></AdminRoute> },
          { path: "addItem", element: <AdminRoute><AdminAddItem /></AdminRoute> },
          { path: "updateItem/:id", element: <AdminRoute><AdminUpdateProduct /></AdminRoute> },
          { path: "admin/profile", element: <AdminRoute><AdminProfile /></AdminRoute> },
          { path: "admin/paymentHistory", element: <AdminRoute><AdminPaymentHistory /></AdminRoute> },
        ],
      },

      { path: "cart", element: <Privet><Cart /></Privet> },
      { path: "category/:id", element: <Privet><Details /></Privet> },
    ],
  },

  // Others
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/payment-success", element: <Privet><PaymentSuccess /></Privet> },
  { path: "/payment-fail", element: <Privet><PaymentFailed /></Privet> },
  { path: "*", element: <NotFound404 /> },
]);

export default router;
