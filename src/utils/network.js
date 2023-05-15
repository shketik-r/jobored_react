import axios from "axios";
import {client_secret, secretKey, token} from "../constans/apiConstants";

export const getApi= async (url) => {
    let res
    try {
        res = await axios.get(url, {
            headers: {
                "x-secret-key": secretKey,
                "X-Api-App-Id": client_secret,
                "Authorization": `Bearer ${token}`
            }
        })
        return res
    } catch (err) {
        console.error(err.message)
        return false
    }
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
