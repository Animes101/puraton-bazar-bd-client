import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'

const Category = () => {
  const [allProduct, setAllProduct]=useState(null)

  useEffect(()=>{

    fetch('product.json')
    .then(res=> res.json())
    .then(data=> setAllProduct(data.products))
  },[])

  return (
   <div className='bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2'>
     <div className='flex my-10'>
      <div className='w-[20%]'>
        catagry
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[80%]'>
        {allProduct?.map((item)=><Card key={item.id} data={item} />)}
      </div>
    </div>
   </div>
  )
}

export default Category