import s from './VacancyPage.module.css'
import {useEffect, useState} from "react";
import {useParams} from 'react-router';
import {getApi} from "../../utils/network";
import {URL, URLVacancies} from "../../constans/apiConstants";

function VacancyPage(props) {
    const [vacancyInfo, setVacancyInfo] = useState(null)
    const id = useParams().id
    const getVacancy = async (url) => {
        const res = await getApi(url)
        console.log("вакансия:",res);
        setVacancyInfo(res.data);
    }

    useEffect(() => {
        getVacancy(URL + URLVacancies + id)
    }, [])

    function createMarkup() {
        return {__html: vacancyInfo.vacancyRichText};
    }
        return (
            <>
                {vacancyInfo?(
                    <div>
                        <div className={s.card}>
                            <div>{vacancyInfo.profession}</div>
                            <div>{vacancyInfo.firm_name}</div>
                            <div>{vacancyInfo.town.title}</div>
                            <div>{vacancyInfo.type_of_work.title}</div>
                            {vacancyInfo.payment_from>0?(
                                <div>зп от {vacancyInfo.payment_from} rub</div>
                            ):''}

                        </div>
                        <div className={s.card} dangerouslySetInnerHTML={createMarkup()}/>
                    </div>
                ):'loading'}
            </>
        )
}

export default VacancyPage;