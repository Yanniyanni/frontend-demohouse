import axios from 'axios'

const http = axios.create({
    // baseURL: baseUrl,
    timeout: 60000,
    withCredentials: true
})

axios.defaults.headers.post['Content-Type'] = 'application/json'

http.interceptors.request.use(function (config) {
    return config
})

http.interceptors.response.use(function (response) {
    return response
})

export default http
