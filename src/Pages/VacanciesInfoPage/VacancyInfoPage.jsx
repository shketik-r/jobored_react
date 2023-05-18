import s from './VacancyInfoPage.module.css'
import {useEffect} from "react";
import {useParams} from 'react-router';
import {getApi} from "../../utils/network";
import {URL, URLVacancies} from "../../constans/apiConstants";
import {setVacancyInfoAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";
import VacanciesList from "../../components/VacanciesList/VacanciesList";
import Info from "../../components/Info/Info";

function VacancyInfoPage() {

    const dispatch = useDispatch()
    const storeVacancyInfo = useSelector(state => state.vacancies.vacancyInfo)

    const id = useParams().id
    const getVacancyInfo = async (url) => {
        const params = new URLSearchParams();
        const res = await getApi(url,params)
        dispatch(setVacancyInfoAC([res.data]));
    }

    useEffect(() => {
        getVacancyInfo(URL + URLVacancies + id)
    }, [])


    return (
        <>
            {storeVacancyInfo? (

                <div>
                    <VacanciesList
                        vacancies={storeVacancyInfo}
                    />
                    <Info
                        info={storeVacancyInfo}
                    />

                </div>
            ) : 'loading'}
        </>
    )
}

export default VacancyInfoPage;