import axios from 'axios'


const axiosPublic=axios.create({
    baseURL:'https://puratonbazarserver.vercel.app',
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic