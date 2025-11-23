import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useItem = (currentPage, itemPerPage, catagory) => {

  const axiosSecure = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    queryKey: ['products', currentPage, itemPerPage, ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/products?page=${currentPage}&limit=${itemPerPage} & catagory=${catagory}}`
      )
      return res.data;
    }
  })

  return { data, error, isLoading }
}

export default useItem
