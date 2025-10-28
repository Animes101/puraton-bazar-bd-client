import React from 'react'
import ReactHelmet from '../Components/Layout/ReactHelmet'
import Banner from '../Components/Banner'

const Home = () => {
  return (
    <div className='flex  flex-col justify-center items-center'>
      <ReactHelmet pageName={'Home Page'} />
      
      <Banner />
    </div>
  )
}

export default Home