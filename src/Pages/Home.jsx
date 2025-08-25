import React from 'react'
import ReactHelmet from '../Components/Layout/ReactHelmet'

const Home = () => {
  return (
    <div className='flex  flex-col justify-center items-center'>
      <ReactHelmet pageName={'Home Page'} />
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
    </div>
  )
}

export default Home