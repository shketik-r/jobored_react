import axios from "axios";

// const token = getLocalStorage('token')
const token = "v3.r.137440105.a52ee82ace0691b44250cf24915bd2eb8cb167bb.c8e690739521d1f337f8b2e3f2f373d472a3b6a4"
const client_secret = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"
const login = "sergei.stralenia@gmail.com"
const password = "paralect123"
const client_id = 2356
const secretKey = "GEU4nvd3rej*jeh.eqp"


const instance = axios.create({
    baseURL: `https://startup-summer-2023-proxy.onrender.com/2.0/`,
    headers: {
        "x-secret-key": secretKey,
        "X-Api-App-Id": client_secret,
        "Authorization": `Bearer ${token}`
    }
})

const instanceAuthorization = axios.create({
    baseURL: `https://startup-summer-2023-proxy.onrender.com/2.0/`,
    headers: {
        "x-secret-key": secretKey,
        "X-Api-App-Id": client_secret,
    }
})

export const getApiVacancies = (params) => {
    return instance.get("vacancies/", {params})
}

export const getApiInfo = (id) => {
    return instance.get(`vacancies/${id}/`)
}

export const getApiCatalogues = () => {
    return instance.get(`catalogues/`)
}

// export const getToken = (token) => {
//     return instanceAuthorization.get(`oauth2/password/`, {
//         params: {
//             'login': login,
//             'password': password,
//             'client_id': client_id,
//             'client_secret': client_secret,
//         }
//     })
// }





