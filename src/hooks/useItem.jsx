import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useItem = (currentPage, itemPerPage) => {

  const axiosSecure = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', currentPage, itemPerPage, ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${itemPerPage}}`
      )
      return res.data;
    }
  })

  return { data, error, isLoading }
}

export default useItem
