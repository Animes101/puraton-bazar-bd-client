import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useCart from "../hooks/useCart";


const Details = () => {
 
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {refetch}=useCart()

  const axiosSecure=useAxiosSecure();

   const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data.data;
    },
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  const handleAddToCart = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be add Cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add to Cart",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Add!",
          text: "Cart item add",
          icon: "success",
        });

        const cart = {
          email: user.email,
          brand: item.brand,
          category: item.category,
          price: item.price,
          name: item.name,
          images: item.images[0],
        };


        axiosSecure.post('/cart', cart)

        .then(result=> {
          
          refetch();
        })

        
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-sm">
        {/* <figure>
          <img src={data?.images[0]} alt="Album" />
        </figure> */}
        <div className="card-body">
          <h2 className="card-title">{data?.name}</h2>
          <h2 className="card-title">{data?.brand}</h2>
          <h2 className="card-title">{data?.condition}</h2>
          <p>{data?.description}</p>
          <p>price: {data?.price}৳</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleAddToCart(data)}
              className="btn bg-buttonBg text-textWhite p-2"
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
