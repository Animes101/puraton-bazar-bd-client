import { useParams } from "react-router-dom";
import useItem from "../hooks/useItem";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios, { Axios } from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Details = () => {
  const { product } = useItem();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const axiosSecure=useAxiosSecure();

  const singleData = product?.find((item) => item.id === parseInt(id));

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
        .then(result=> console.log(result))

        
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure>
          <img src={singleData?.images[0]} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{singleData?.name}</h2>
          <h2 className="card-title">{singleData?.brand}</h2>
          <h2 className="card-title">{singleData?.condition}</h2>
          <p>{singleData?.description}</p>
          <p>price: {singleData?.price}৳</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => handleAddToCart(singleData)}
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
