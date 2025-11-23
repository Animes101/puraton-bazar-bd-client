import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useItem = (currentPage, itemPerPage, selectedCategory,selectedPrice) => {
  const axiosSecure = useAxiosSecure();

  console.log(selectedCategory)

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', currentPage, itemPerPage, selectedCategory,selectedPrice],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?page=${currentPage}&limit=${itemPerPage}&category=${selectedCategory}&price=${selectedPrice}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return { data, error, isLoading };
};

export default useItem;
