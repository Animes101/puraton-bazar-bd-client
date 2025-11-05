import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'


const useItem = () => {

  const  axiosSecure  = useAxiosSecure();

  const { data, error } = useQuery({
    
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosSecure.get('/products')
      return res.data.data;

    }
  })

  return { data, error }
 
}

export default useItem