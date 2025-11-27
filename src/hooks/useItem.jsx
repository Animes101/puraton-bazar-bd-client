import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useItem = (currentPage, itemPerPage, selectedCategory, search, min, max) => {
  const axiosSecure = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    queryKey: [
      'products',
      currentPage,
      itemPerPage,
      selectedCategory,
      min,
      max,
      search
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${itemPerPage}&category=${selectedCategory}&minPrice=${min}&maxPrice=${max}&search=${search}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  return { data, error, isLoading };
};

export default useItem;
