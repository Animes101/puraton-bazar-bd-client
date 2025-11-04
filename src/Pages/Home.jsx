import React from 'react'
import ReactHelmet from '../Components/Layout/ReactHelmet'
import Banner from '../Components/Banner'
import useItem from '../hooks/useItem'
import Card from '../Components/Card'

const Home = () => {

  const {product}=useItem();
  console.log(product)

   const  Mobile=product?.filter((item)=> item.category === 'Mobile' );
   const Laptop=product?.filter((item)=> item.category === 'Laptop')

   console.log(Mobile)
  return (
    <div className=''>
      <ReactHelmet pageName={'Home Page'} />
      
      <Banner />

      <div className='container mx-auto'>
        <h1 className='text-center text-3xl text-textColor font-bold py-10'>Best Mobile</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {
          Mobile?.map((item, index)=> <Card key={index} data={item} />)
        }
        </div>
      </div>

      <div className='container mx-auto'>
        <h1 className='text-center text-3xl text-textColor font-bold py-10'>Best Laptop</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {
          Laptop?.map((item, index)=> <Card key={index} data={item} />)
        }
        </div>
      </div>
    </div>
  )
}

export default Home