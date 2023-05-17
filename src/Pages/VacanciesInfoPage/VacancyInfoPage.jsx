import s from './VacancyInfoPage.module.css'
import {useEffect} from "react";
import {useParams} from 'react-router';
import {getApi} from "../../utils/network";
import {URL, URLVacancies} from "../../constans/apiConstants";
import {setVacancyInfoAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";

function VacancyInfoPage() {

    const dispatch = useDispatch()
    const storeVacancyInfo = useSelector(state => state.vacancies.vacancyInfo)

    const id = useParams().id
    const getVacancy = async (url) => {
        const res = await getApi(url)
        dispatch(setVacancyInfoAC(res.data));
    }

    useEffect(() => {
        getVacancy(URL + URLVacancies + id)
    }, [])

    function createMarkup() {
        return {__html: storeVacancyInfo.vacancyRichText};
    }

    return (
        <>
            {storeVacancyInfo ? (
                <div>
                    <div className={s.card}>
                        <div>{storeVacancyInfo.profession}</div>
                        <div>{storeVacancyInfo.firm_name}</div>
                        <div>{storeVacancyInfo.town.title}</div>
                        <div>{storeVacancyInfo.type_of_work.title}</div>
                        {storeVacancyInfo.payment_from > 0 ? (
                            <div>зп от {storeVacancyInfo.payment_from} rub</div>
                        ) : ''}
                    </div>
                    <div className={s.card} dangerouslySetInnerHTML={createMarkup()}/>
                </div>
            ) : 'loading'}
        </>
    )
}

export default VacancyInfoPage;