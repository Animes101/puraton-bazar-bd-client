import { useEffect, useState } from 'react'
import Card from '../Components/Card'
import useItem from '../hooks/useItem';

const Category = () => {

  const {data}=useItem();





  return (
   <div className='bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2 my-10'>
     <div className='flex '>
      <div className='w-[20%]'>
        catagry
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[80%]'>
        {data?.map((item)=><Card key={item.id} data={item} />)}
      </div>
    </div>
   </div>
  )
}

export default Category