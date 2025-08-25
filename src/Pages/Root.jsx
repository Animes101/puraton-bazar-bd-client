import { Outlet } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

const Root = () => {

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        {/* Main content */}
      <main className="flex-1">
        <Outlet /> {/* এখানে Home, About page render হবে */}
      </main>
        <Footer />
    </div>
  )
}

export default Root;
