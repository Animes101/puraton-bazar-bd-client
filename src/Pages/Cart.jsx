import useCart from "../hooks/useCart"


const Cart = () => {

  const {data, isLoading, isError, error}=useCart();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data);



  return (
    <div>Cart</div>
  )
}

export default Cart