import useAdmin from "../hooks/useAdmin";
import AdminHome from "../Pages/AdminHome";
import UserHome from "../Pages/UserHome";

;

const DashboardLanding = () => {
  const { isAdmin } = useAdmin();
  return isAdmin ? <AdminHome /> : <UserHome />;
};

export default DashboardLanding;
