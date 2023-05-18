import axios from "axios";
import {client_secret, secretKey, token} from "../constans/apiConstants";




const instance =  axios.create({
        baseURL: `https://startup-summer-2023-proxy.onrender.com/2.0/`,
        headers: {
            "x-secret-key": "GEU4nvd3rej*jeh.eqp",
            "X-Api-App-Id": client_secret,
            "Authorization": `Bearer ${token}`
        }
    })


export const getApiVacancies=  (params ) => {
   return  instance.get("vacancies/", {params})
}

export const getApiInfo=  (id) => {
    return  instance.get(`vacancies/${id}/`)
}


export const getApiCatalogues=  () => {
    return  instance.get(`catalogues/`)
}







// useEffect(() => {
//     axios.get(URL, {
//         headers: {
//             "x-secret-key": "GEU4nvd3rej*jeh.eqp",
//         }
//     })
//         .then(res => {
//             console.log("Authorization", res.data);
//         })
// }, [])


