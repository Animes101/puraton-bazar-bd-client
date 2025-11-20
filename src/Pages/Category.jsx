import { useState } from 'react';
import Card from '../Components/Card'
import useItem from '../hooks/useItem';

const Category = () => {

  
  const [itemPerPage, setItemPerPage]=useState(10)
  const [currentPage, setCurrentPage]=useState(0)
  const {data, isLoading}=useItem(currentPage, itemPerPage);

  if(isLoading){
    return <h1>loading..................</h1>
  }


  const totalProduct=data?.total_product;
  const numberOfPage=Math.ceil(totalProduct / itemPerPage);

  const pages=[]


    for(let i=0; i <= numberOfPage; i++){

      pages.push(i)


    }

    const handleChange=(e)=>{
      const value=parseInt(e.target.value)

      setItemPerPage(value);
      setCurrentPage(0)

    }

    const handlePrev=()=>{

      if(currentPage > 0){

        setCurrentPage(currentPage -1)
      }

    }

    const handleNext=()=>{

      if(currentPage < pages.length){

        setCurrentPage(currentPage +1)
      }

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
        <button onClick={handlePrev}>prev</button>
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

<button onClick={handleNext}>next</button>
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