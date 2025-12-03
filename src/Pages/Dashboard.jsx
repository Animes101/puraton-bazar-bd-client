
import { Link, Outlet } from 'react-router-dom'
import useAdmin from '../hooks/useAdmin';


const Dashboard = () => {

  const {isAdmin}=useAdmin();

  
  
  const admin=isAdmin;


  return (
    <div className='grid grid-cols-4 gap-10 mt-[64px]' >

      <div className='col-span-1 bg-bg3 h-screen text-white border border-green-500'>
      {admin ?   <ul className='flex flex-col justify-around h-[400px] text-textColor font-bold  items-center '>
          <li>
            <Link to='/dashboard/adminHome'>Admin Home</Link>
          </li>
          <li>
            <Link to='/dashboard/all-users'>All Users</Link>
          </li>
          <li>
            <Link to='/dashboard/addItem'>Add Items</Link>
          </li>
          <li>
            <Link to='/dashboard/products'>All Products</Link>
          </li>
          <li>
            <Link to='/dashboard/admin/paymentHistory'>Payment Status</Link>
          </li>
          <li>
            <Link to='/dashboard/admin/profile'>Admin Profile</Link>
          </li>
        </ul> : 
        
          <ul className='flex flex-col justify-around h-[400px] text-textColor font-bold  items-center'>
          <li>
            <Link to='/dashboard/home'>User Home</Link>
          </li>
          <li>
            <Link to='/dashboard/Payment'>User Payment</Link>
          </li>
          <li>
            <Link to='/dashboard/profile'>User Profile</Link>
          </li>
        </ul>
        }

      </div>
      <div className='col-span-3 w-[90%]'>
        <Outlet />

      </div>
    </div>
  )
}

export default Dashboard