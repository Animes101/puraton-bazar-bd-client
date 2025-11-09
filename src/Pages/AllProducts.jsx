import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllProducts = () => {
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure("/products");
      return res.data;
    },
  });

  return (
    <div>
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
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                Zemlak, Daniel and Leannon
                <br />
                <span className="badge badge-ghost badge-sm">
                  Desktop Support Technician
                </span>
              </td>
              <td>Purple</td>
              <th>
                <button className="btn bg-bgGradient2 p-2 btn-xs">delete</button>
                <button className="btn bg-bgGradient2 p-2 ml-3 btn-xs">Update</button>
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
