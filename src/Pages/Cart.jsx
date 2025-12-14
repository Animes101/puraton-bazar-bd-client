import useCart from "../hooks/useCart";
import { GoCheck } from "react-icons/go";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = () => {
  const { data, isLoading, isError, refetch } = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice =
    data?.reduce((sum, item) => sum + Number(item.price), 0) || 0;

  const handleRemoveCart = (id) => {
    Swal.fire({
      title: "Remove Item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5b6e74",
      cancelButtonColor: "#0d0d0d",
      background: "#f2f2f0",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      iconColor: "#F1C40F",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`)
          .then((res) => {
            if (res?.data?.data?.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Removed!",
                text: "Item removed from cart successfully",
                icon: "success",
                confirmButtonColor: "#5b6e74",
                background: "#f2f2f0",
                timer: 1500,
                showConfirmButton: false,
                iconColor: "#F1C40F",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to remove item. Please try again.",
              icon: "error",
              confirmButtonColor: "#5b6e74",
              background: "#f2f2f0",
              
            });
          });
      }
    });
  };

  /* ================== Loading ================== */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-bg3"></span>
      </div>
    );
  }

  /* ================== Error ================== */
  if (isError) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-xl text-red-500 font-semibold">
          Failed to load cart items
        </h2>
      </div>
    );
  }

  /* ================== Empty Cart ================== */
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
        <h2 className="text-3xl font-bold text-gray-500">
          No Product Found 🛒
        </h2>
        <p className="text-gray-400 text-center">
          Your cart is empty. Add some products.
        </p>
        <Link to="/category" className="btn bg-bg3 text-white">
          Continue Shopping
        </Link>
      </div>
    );
  }

  /* ================== Cart Table ================== */
  return (
    <div className="container mx-auto pt-[64px] px-3 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 py-4">
        <h1 className="text-xl md:text-3xl font-bold">
          Total Cart Items: {data.length}
        </h1>

        <h1 className="text-xl md:text-3xl font-bold">
          Total Price: ৳ {totalPrice}
        </h1>

        <Link
          to="/dashboard/paymentSSl"
          state={{ totalPrice, data }}
          className="btn bg-bg3 text-white hover:bg-bg3/80 w-full md:w-auto"
        >
          Checkout
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra min-w-[700px]">
          <thead className="bg-bg3 text-white">
            <tr>
              <th>
                <GoCheck className="text-xl md:text-2xl font-bold" />
              </th>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="bg-bg4/40 text-sm md:text-base">
            {data.map((item) => (
              <tr key={item._id}>
                <th>
                  <GoCheck className="text-lg md:text-xl font-bold" />
                </th>

                <td className="whitespace-nowrap">{item.name}</td>

                <td>
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full"
                  />
                </td>

                <td className="whitespace-nowrap">{item.email}</td>
                <td>{item.category}</td>
                <td>৳ {item.price}</td>

                <td>
                  <button
                    onClick={() => handleRemoveCart(item._id)}
                    className="btn btn-sm md:btn-md flex items-center gap-1"
                  >
                    <MdDelete size={30} className="text-btnBg " />
                    
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
