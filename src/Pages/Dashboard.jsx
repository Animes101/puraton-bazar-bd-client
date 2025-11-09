
import { Link, Outlet } from 'react-router-dom'


const Dashboard = () => {


  const isAdmin=true;


  return (
    <div className='grid grid-cols-4 gap-4'>

      <div className='col-span-1 bg-bgGradient2  h-screen '>
      {isAdmin ?   <ul className='flex flex-col justify-around h-[400px] text-textColor font-bold  items-center '>
          <li>
            <Link to='/dashboard/home'>Admin Home</Link>
          </li>
          <li>
            <Link to='/dashboard/all-users'>All Users</Link>
          </li>
          <li>
            <Link to='/dashboard/profile'>Admin Profile</Link>
          </li>
          <li>
            <Link to='/dashboard/products'>All Products</Link>
          </li>
          <li>
            <Link to='/dashboard/profile'>Admin Profile</Link>
          </li>
        </ul> : 
        
          <ul>
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
      <div className='col-span-3'>
        <Outlet />

      </div>
    </div>
  )
}

export default Dashboard