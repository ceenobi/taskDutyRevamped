import axios from "axios"

const BASEURL = import.meta.env.VITE_BASE_URL

const config = {
    baseURL: BASEURL
}

const axiosClient = axios.create(config)

export default axiosClient