import s from './VacanciePage.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {client_secret, token} from "../../App";


function VacanciePage(props) {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/35276608/`, {
            headers: {
                "x-secret-key": "GEU4nvd3rej*jeh.eqp",
                "X-Api-App-Id": client_secret,
                "Authorization": token
            }
        })
            .then(res => {
                console.log(res.data);
            })
    }, [])



    return (
        <div>
           123
        </div>
    )
}

export default VacanciePage;