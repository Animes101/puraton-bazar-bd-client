import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {

  const isAdmin=true;

  return (
    <div className='grid grid-cols-2 gap-4'>

      <div className=''>
      {isAdmin ?   <ul>
          <li>
            <Link to='/dashboard/home'>Admin Home</Link>
          </li>
          <li>
            <Link to='/dashboard/Payment'>All Users</Link>
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
      <div>
        <Outlet />

      </div>
    </div>
  )
}

export default Dashboard