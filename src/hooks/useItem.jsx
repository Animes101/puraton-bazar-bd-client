import React, { useEffect, useState } from 'react'

const useItem = () => {
    const [product, setProduct]=useState(null);


    useEffect(()=>{

      fetch('/product.json')
      .then(res=>res.json())
      .then(data=> setProduct(data))

    },[])
  return {product}
}

export default useItem