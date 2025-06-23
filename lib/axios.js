import Axios from 'axios'

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  
  withXSRFToken: true,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
     Authorization: 'Bearer 1|qrtXviypSB9e6JZyjvFevTZqwhtGF1N8nEc7JLCQ4a6d309d',
  },
  
})

export default axios