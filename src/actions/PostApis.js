import axios from "axios";
import logout from "./logout";

const baseURL = 'http://localhost:8000/api'

export default  function PostApis(route, data, callback ){
    axios.post(`${baseURL}${route}`, data)
    .then(res => {
        callback(res['data'], null)
    },
    ).catch((e) => {
        if (e.response.status === 401) {
            logout()
        }
        callback(null, e);
    })
}