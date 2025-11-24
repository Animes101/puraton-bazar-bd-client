import { Outlet } from "react-router-dom";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

const Root = () => {

  return (
    <div className=''>
        <Navbar />
        {/* Main content */}
      <main className="">
        <Outlet /> {/* এখানে Home, About page render হবে */}
      </main>
        <Footer />
    </div>
  )
}

export default Root;
