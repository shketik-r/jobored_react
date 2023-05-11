import s from './VacancyPage.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {client_secret, token} from "../../App";


function VacancyPage(props) {
    const [vacancy, setVacancy] = useState({})

    useEffect(() => {
        let href = window.location.pathname;
        axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0${href}`, {
            headers: {
                "x-secret-key": "GEU4nvd3rej*jeh.eqp",
                "X-Api-App-Id": client_secret,
                "Authorization": token
            }
        })
            .then(res => {
                setVacancy(res.data)
            })
    }, [])


    if (Object.keys(vacancy).length !== 0) {      
        return (
            <div>
                <div className={s.card}>
                    <div>{vacancy.profession}</div>
                    <div>{vacancy.firm_name}</div>
                    <div>{vacancy.town.title}</div>
                    <div>{vacancy.type_of_work.title}</div>
                    <div>зп от {vacancy.payment_from} rub</div>
                </div>
                <div className={s.card} >
                    {vacancy.vacancyRichText} 
                </div>
            </div>
        )
    }else{
        return "Loading"
    }
}

export default VacancyPage;