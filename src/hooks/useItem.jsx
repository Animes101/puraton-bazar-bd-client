import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useItem = (currentPage, itemPerPage, selectedCategory) => {
  const axiosSecure = useAxiosSecure();

  console.log(selectedCategory)

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', currentPage, itemPerPage, selectedCategory],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?page=${currentPage}&limit=${itemPerPage}&category=${selectedCategory}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return { data, error, isLoading };
};

export default useItem;
