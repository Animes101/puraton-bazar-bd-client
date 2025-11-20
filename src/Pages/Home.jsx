import React from 'react'
import ReactHelmet from '../Components/Layout/ReactHelmet'
import Banner from '../Components/Banner'
import Card from '../Components/Card'
import useItem from '../hooks/useItem'

const Home = () => {

  const { data: laptopData, isLoading: laptopLoading } = useItem(0, 6, "laptop");

  const { data: mobileData } = useItem(0, 6, "mobile");

  console.log(laptopData, mobileData)


  return (
    <div className=''>
      <ReactHelmet pageName={'Home Page'} />
      
      <Banner />

      <div className='container mx-auto'>
        <h1 className='text-center text-3xl text-textColor font-bold py-10'>Categories</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          
        
        </div>
      </div>

      <div className='container mx-auto'>
        <h1 className='text-center text-3xl text-textColor font-bold py-10'>Best Laptop</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
         
        </div>
      </div>
    </div>
  )
}

export default Home