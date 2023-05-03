import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


function App() {

    const login = "sergei.stralenia@gmail.com"
    const password = "paralect123"
    const client_id = 2356
    const client_secret = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"
    const URL = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}`

    axios.get(URL, {
        headers: {"x-secret-key": "GEU4nvd3rej*jeh.eqp"}
    })
        .then(res => {
            console.log("Authorization", res);
        })


    axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/catalogues`, {
        headers: {"x-secret-key": "GEU4nvd3rej*jeh.eqp"}
    })
        .then(res => {
            console.log("catalogues", res.data);
        })
}

export default App;
