import s from './MainPage.module.css'
import React, {useState, useEffect} from "react";
import {getApiVacancies} from "../../utils/network";
import VacanciesList from "../../components/VacanciesList/VacanciesList";
import SearchVacancies from "../../components/SearchVacancies/SearchVacancies";
import {useSelector, useDispatch} from "react-redux";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import FilterVacancies from "../../components/FilterVacancies/FilterVacancies";
import {Loader, Pagination} from "@mantine/core";

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)

    const dispatch = useDispatch()
    const storeVacancies = useSelector(state => state.vacancies.vacancies)
    const storeFilter = useSelector(state => state.filter)

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('keyword', storeFilter.keyword);
        params.append('published', storeFilter.published);
        params.append('payment_from', storeFilter.filter.paymentFrom);
        params.append('payment_to', storeFilter.filter.paymentTo);
        params.append('catalogues', storeFilter.filter.catalogues);
        params.append('count', 4);
        params.append('page', currentPage);

        getApiVacancies(params)
            .then(res => {
                const total = res.data.total
                total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
                dispatch(setVacanciesAC(res.data.objects))
            })

    }, [currentPage])

    const handlePageClick = (e) => {
        setCurrentPage(e - 1)
    }

    return (
        <div className={s.wrapper}>
            <FilterVacancies setPages={setPages}/>
            <div>
                <SearchVacancies setPages={setPages}/>
                {storeVacancies ? (<div className={s.wrapper_list}>
                    <VacanciesList
                        vacancies={storeVacancies}
                    />

                    <Pagination
                        total={pages}
                        onChange={handlePageClick}
                        mt="1rem"
                        position="center"
                    />


                </div>) : <Loader/>}
            </div>

        </div>)
}
export default MainPage;