import s from './MainPage.module.css'
import {getApi} from "../../utils/network";
import {useEffect, useState} from "react";
import {URL, URLVacancies} from "../../constans/apiConstants";
import VacanciesList from "../../components/VacanciesList/VacanciesList";
import SearchVacancies from "../../components/SearchVacancies/SearchVacancies";

function MainPage() {
    const [vacancies, setVacancies] = useState(null)
    const getVacancies = async (url) => {
        const res = await getApi(url)
        const objectsVacancies = res.data.objects.map((e) => {
            return {
                profession: e.profession,
                firmName: e.firm_name,
                town: e.town.title,
                typeOfWork: e.type_of_work.title,
                paymentFrom: e.payment_from,
                id: e.id
            }
        })
        setVacancies(objectsVacancies);
    }

    useEffect(() => {
        getVacancies(URL + URLVacancies)
    }, [])

    return (
        <>
        <SearchVacancies/>
            {vacancies ? (<div className={s.page}>
                        <VacanciesList
                            vacancies={vacancies}
                        />
            </div>) : 'Loading'}
        </>
    )
}
export default MainPage;