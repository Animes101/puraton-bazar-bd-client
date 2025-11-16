import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading , refetch} = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure("/products");
      return res.data;
    },
  });

  if(data?.data?.length<0){
    return <h1 className="text-3xl font-bold text-center mt-10">No Products Available</h1>
  }

  if(isLoading){
     return <h1>Loaing..............</h1>
  }

  const handleDelete=(id)=>{
    axiosSecure.delete(`/products/${id}`)
    .then(result=> {

      console.log(result)

      if(result.data.data.deletedCount>0 ){

         Swal.fire({
  position: "top-end",
  icon: "success",
  title: `Delete ${id}`,
  showConfirmButton: false,
  timer: 1500
});
refetch()
      }
    })

  }

  return (
    <div>
      <h1>{data?.data?.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th> Image & Name</th>
              <th>Catagory</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data?.data?.map((product,index)=>{
                return (

                     <tr>
              <th>
               {index+1}
              </th>
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
                    <div className="text-sm opacity-50">{product?.description}</div>
                  </div>
                </div>
              </td>
              <td>
                {product.category}
                
              </td>
              <td>{product.price}</td>
              <th>
                <button onClick={()=>handleDelete(product._id)} className="btn bg-bgGradient2 p-2 btn-xs">delete</button>
                <Link to={`/dashboard/updateItem/${product._id}`}  className="btn bg-bgGradient2 p-2 ml-3 btn-xs">Update</Link>
              </th>
            </tr>
                )
            })}
           
            
          </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
