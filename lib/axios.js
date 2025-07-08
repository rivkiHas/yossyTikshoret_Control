import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    // Authorization: Bearer ${process.env.API_TOKEN},
  },
  withXSRFToken: true,
  withCredentials: true,
})

export default axios
