import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext);

  const { data, isLoading, isError, error , refetch } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user?.email}`);
      return res.data.data; // depends on backend response structure
    },
  });

  return { data, isLoading, isError, error, refetch };
};

export default useCart;
