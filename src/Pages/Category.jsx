import { useState } from 'react';
import Card from '../Components/Card'
import useItem from '../hooks/useItem';

const Category = () => {

  const {data, isLoading}=useItem();
  const [itemPerPage, setItemPerPage]=useState(10)
  const [currentPage, setCurrentPage]=useState(1)

  if(isLoading){
    return <h1>loading..................</h1>
  }


  const totalProduct=data?.total_product;
  const numberOfPage=Math.ceil(totalProduct / itemPerPage);

  const pages=[]


    for(let i=1; i <= numberOfPage; i++){

      pages.push(i)


    }

    const handleChange=(e)=>{
      const value=parseInt(e.target.value)

      setItemPerPage(value);
      setCurrentPage(1)

    }

console.log(currentPage)


  return (
   <div className='bg-gradient-to-r from-bgGradient1 via-bgGradient3 to-bgGradient2 my-10'>
     <div className='flex '>
      <div className='w-[20%]'>
        catagry
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[80%]'>
        {data?.data?.map((item)=><Card key={item.id} data={item} />)}
        
      </div>
    </div>
    <div className='flex justify-center items-center'>
      <div>
        <button>prev</button>
 {
  pages?.map((page, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(page)}
      className={`px-5 py-1 rounded-full 
        ${currentPage === page ? "bg-green-600 text-white" : "bg-green-300"}
      `}
    >
      {page}
    </button>
  ))
}

<button>next</button>
        <select onChange={handleChange} value={itemPerPage} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
   </div>
  )
}

export default Category