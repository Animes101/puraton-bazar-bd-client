import useCart from "../hooks/useCart";
import { GoCheck } from "react-icons/go";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, isError, refetch } = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = data?.reduce((sum, item) => sum + Number(item.price), 0) || 0;


  const handleRemoveCart = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#5b6e74", 
    cancelButtonColor: "#0d0d0d",
    background: "#f2f2f0",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {

      axiosSecure.delete(`/cart/${id}`)
        .then((res) => {
          if (res.data?.data?.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Item removed from cart.",
              icon: "success",
              confirmButtonColor: "#5b6e74",
              background: "#f2f2f0",
            });
          }
        })
        .catch((err) => console.error("Error deleting cart item:", err));
    }
  });
};


  return (
    <div className="container mx-auto pt-[64px]">
      <div className="flex justify-between py-4">
        <h1 className="text-3xl font-bold">Total Cart Items: {data?.length}</h1>
        <h1 className="text-3xl font-bold">Total Price: {totalPrice}</h1>
        <Link to={'/dashboard/paymentSSl'} state={{totalPrice,data }} className="btn bg-bg3 text-white hover:bg-bg3/90">Checkout</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-bg3 text-white">
            <tr>
              <th>
                <GoCheck className="text-2xl font-bold" />
              </th>
              <th>Name</th>
              <th>images</th>
              <th>email</th>
              <th>category</th>
              <th>Price</th>
              <th></th>
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
