import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCart from "../hooks/useCart";
import toast, { Toaster } from "react-hot-toast";

const Details = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const { refetch } = useCart();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be add Cart",
      showCancelButton: true,
      confirmButtonColor: "#5b6e74",
      cancelButtonColor: "#0d0d0d",
      background: "#f2f2f0",
      confirmButtonText: "Add to Cart",
    }).then((result) => {
      if (result.isConfirmed) {
        const cart = {
          email: user.email,
          itemId: item._id,
          brand: item.brand,
          category: item.category,
          price: item.price,
          name: item.name,
          images: item.images[0],
        };

        axiosSecure.post(`/cart?itemId=${item._id}`, cart).then((result) => {
          if (result.data.status === "error") {
            return toast.error(`${result.data.message}`);
          }

          if (result.data.data?.insertedId) {
            refetch();

            Swal.fire({
              title: "Add Successfully",
              icon: "success",
              background: "#f2f2f0",
              color: "#333",
              confirmButtonColor: "#5b6e74",
            });
          } else {
            toast.error(`${result.data.data}`);
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto mt-[64px] h-full  md:h-[600px] flex justify-center items-center">
      <div className="card lg:card-side shadow-md w-full bg-bg2">
        <figure>
          <img
            src={data.images[0]}
            alt={data.name || "Product Image"}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body space-y-4 space-x-3">
          <h2 className="card-title text-4xl font-bold">{data?.name}</h2>
          <h2 className="card-title text-2xl">{data?.brand}</h2>
          <h2 className="card-title text-2xl">{data?.condition}</h2>
          <p className="text-xl">{data?.description}</p>
          <p className="text-xl font-bold">price: {data?.price}৳</p>
          <p className="text-xl  font-bold">postedAt: {data?.postedAt}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleAddToCart(data)}
              className="btn bg-bg3 font-bold  text-bg2 hover:bg-bg3/80 p-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
