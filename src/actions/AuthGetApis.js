import axios from "axios";
import logout from "./logout";

const baseURL = 'http://localhost:8000/api'
const token = localStorage.getItem('token');

export default  function AuthGetApis(route, callback ){
    axios.get(`${baseURL}${route}`, { headers: {"Authorization" : `Bearer ${token}`}})
    .then(
    res => {
        callback(res['data'], null)

    }).catch((e) => {
        if (e.response.status === 401) {
            logout()
        }
        callback(null, e);
    })
}
