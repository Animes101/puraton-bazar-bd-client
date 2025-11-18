import useCart from "../hooks/useCart";
import { GoCheck } from "react-icons/go";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, isError, error, refetch } = useCart();
  const axiosSecure = useAxiosSecure();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  if(data?.length === 0){
    return <h1 className="text-3xl font-bold text-center mt-10">No Products Available ............!</h1>
  }

  const totalPrice = data?.reduce((sum, item) => sum + Number(item.price), 0) || 0;


  const handleRemoveCart = (id) => {
    // Logic to remove item from cart
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/cart/${id}`)
          .then((data) => {                                 

            if(data.data.data.deletedCount>0){{
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          }}
          )
          .catch((error) => console.error("Error deleting cart item:", error));
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h1>Total Cart Items: {data?.length}</h1>
        <h1>Total Price: {totalPrice}</h1>
        <Link to={'/dashboard/paymentSSl'} state={{totalPrice,data }} className="btn btn-primary">Checkout</Link>
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
            {data?.map((item) => {
              return (
                <tr key={item._id}>
                  <th>
                    <GoCheck className="text-xl font-bold" />
                  </th>
                  <td>{item.name}</td>
                  <td>{item.images}</td>
                  <td>{item.email}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => handleRemoveCart(item._id)}
                      className="btn bg-black text-white p-2"
                    >
                      Remove <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
