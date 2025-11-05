import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cart");
      return res.data.data; // depends on backend response structure
    },
  });

  return { data, isLoading, isError, error };
};

export default useCart;
