import axios from "axios";
import logout from "./logout";

const baseURL = 'http://localhost:8000/api'
const token = localStorage.getItem('token');

export default  function AuthPatchApis(route, data, callback ){
    axios.patch(`${baseURL}${route}`, data, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
        callback(res['data'], null)
    },

    ).catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
            logout()
        }
        callback(null, e);
    })
}