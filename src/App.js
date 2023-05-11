import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./components/Header/Head";
import VacancyPage from "./Pages/VacanciesPage/VacancyPage";

export let token = 'Bearer v3.r.137440105.29c410f0e60d6402bef0e35f94a742e3681565ef.507441b91a23d812f099915eb41310cd7d5ea17a'
let login = "sergei.stralenia@gmail.com"
let password = "paralect123"
let client_id = 2356
export let client_secret = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948"
const URL = `https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password/?login=${login}&password=${password}&client_id=${client_id}&client_secret=${client_secret}`

function App() {

    const [data, setData] = useState([])
 
    // useEffect(() => {
    //
    //     axios.get(URL, {
    //         headers: {
    //             "x-secret-key": "GEU4nvd3rej*jeh.eqp",
    //         }
    //     })
    //         .then(res => {
    //             console.log("Authorization", res.data);
    //         })
    // }, [])


    useEffect(() => {
        axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/`, {
            headers: {
                "x-secret-key": "GEU4nvd3rej*jeh.eqp",
                "X-Api-App-Id": client_secret,
                "Authorization": token
            }
        })
            .then(res => {
                setData(res.data)
            })
    }, [])


    return (

        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage
                    data={data}
                />}/>
                <Route path="/vacancies/*" element={<VacancyPage
                />}/>
            </Routes>
        </div>
    )

}

export default App;

