import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useItem from "../hooks/useItem";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

  // const { data, isLoading, refetch } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => {
  //     const res = await axiosSecure("/products");
  //     return res.data;
  //   },
  // });

  const {data}=useItem();

  console.log(data)

 


  const handleDelete = (id) => {
    axiosSecure.delete(`/products/${id}`).then((result) => {

      if (result.data.data.deletedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Delete ${id}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-bg3 py-4">Total Products={data?.data?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table  table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>
              </th>
              <th className="text-3xl font-bold text-bg1"> Image & Name</th>
              <th className="text-3xl font-bold text-bg1">Catagory</th>
              <th className="text-3xl font-bold text-bg1">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="bg-bg4/30">
            {/* row 1 */}
            {data?.data?.map((product, index) => {
              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={product.images[0]}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{product?.name}</div>
                        <div className="text-sm opacity-50">
                          {product?.description ? product.description.slice(0, 100) + (product.description.length > 100 ? "..." : "") : ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn bg-bg1 text-white p-2"
                    >
                      delete
                    </button>
                    
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/updateItem/${product._id}`}
                      className=" bg-bg3 p-2 ml-3 btn  text-white"
                    >
                      Update
                    </Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
