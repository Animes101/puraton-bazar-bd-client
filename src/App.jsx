import { RouterProvider } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast';


import router from './routes/route';
import AuthProvider from './context/AuthProvider';

function App() {

  return (

    <div className='bg-bg5'> 
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <AuthProvider>
        <RouterProvider router={router} /> 
      </AuthProvider> 
    </div>
  )
}

export default App
