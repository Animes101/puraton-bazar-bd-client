import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'


const useItem = () => {

  const  axiosSecure  = useAxiosSecure();

  const { data, error, isLoading } = useQuery({
    
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products')
      return res.data.data;

    }
  })

  return { data, error, isLoading }
 
}

export default useItem