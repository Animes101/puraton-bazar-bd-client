import { RouterProvider } from 'react-router-dom';
import './App.css'


import router from './routes/route';
import AuthProvider from './context/AuthProvider';

function App() {

  return (

    <div>    
      <AuthProvider>
        <RouterProvider router={router} /> 
      </AuthProvider> 
    </div>
  )
}

export default App
