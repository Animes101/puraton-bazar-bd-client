import useCart from "../hooks/useCart";
import { GoCheck } from "react-icons/go";

const Cart = () => {
  const { data, isLoading, isError, error } = useCart();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data);

  const totalPrice = data?.reduce((sum, item) => sum + item.price, 0) || 0;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h1>Total Cart Items: {data?.length}</h1>
        <h1>Total Price: {totalPrice}</h1>
        <button className="btn btn-primary">Checkout</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <GoCheck className="text-2xl font-bold" />
              </th>
              <th>Name</th>
              <th>images</th>
              <th>email</th>
              <th>category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.map((item)=>{
              return(
                <tr key={item.id}>
                  <th>
                    <GoCheck className="text-xl font-bold" />
                  </th>
                  <td>{item.name}</td>
                  <td>{item.images}</td>
                  <td>{item.email}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="btn btn-danger">Remove</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
