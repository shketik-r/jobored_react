import s from './MainPage.module.css'
import React, {useState, useEffect} from "react";
import {getApi} from "../../utils/network";
import {URL, URLVacancies} from "../../constans/apiConstants";
import VacanciesList from "../../components/VacanciesList/VacanciesList";
import SearchVacancies from "../../components/SearchVacancies/SearchVacancies";
import {useSelector, useDispatch} from "react-redux";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import FilterVacancies from "../../components/FilterVacancies/FilterVacancies";
import ReactPaginate from "react-paginate";


const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState(0)

    const dispatch = useDispatch()
    const storeVacancies = useSelector(state => state.vacancies.vacancies)
    const storeFilter = useSelector(state => state.filter)
    const getVacancies = async (url) => {
        const params = new URLSearchParams();
        params.append('keyword', storeFilter.keyword);
        params.append('published', storeFilter.published);
        params.append('payment_from', storeFilter.payment_from);
        params.append('payment_to', storeFilter.payment_to);
        params.append('catalogues', storeFilter.catalogues);
        params.append('count', 4)
        params.append('page', currentPage);

        const res = await getApi(url, params)
        console.log(res);
        const total = res.data.total
        if (total >= 500) {
            setPages(125)
        } else {
            setPages(Math.ceil(total / 4))
        }


        const objectsVacancies = res.data.objects.map((e) => {
            return {
                profession: e.profession,
                firmName: e.firm_name,
                town: e.town.title,
                typeOfWork: e.type_of_work.title,
                paymentFrom: e.payment_from,
                currency: e.currency,
                id: e.id
            }
        })
        dispatch(setVacanciesAC(objectsVacancies))
    }

    useEffect(() => {
        getVacancies(URL + URLVacancies)
    }, [currentPage])


    const handlePageClick = (e) => {
        setCurrentPage(e.selected)
    }
    // total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4));


    return (
        <>
            <FilterVacancies setPages={setPages}/>
            <SearchVacancies setPages={setPages}/>
            {storeVacancies ? (<div className={s.page}>
                <VacanciesList
                    vacancies={storeVacancies}
                />
                <ReactPaginate
                    pageCount={pages}
                    breakLabel="..."
                    previousLabel="< "
                    nextLabel=" >"
                    marginPagesDisplayed={3}
                    onPageChange={handlePageClick}

                    // containerClassName={}
                    // pageClassName={}
                    // pageLinkClassName={}
                    // previousClassName={}
                    // previousLinkClassName={}
                    // nextClassName={}
                    // nextLinkClassName={}
                    // breakClassName={}
                    // breakLinkClassName={}
                    // activeClassName={}
                />

            </div>) : 'Loading'}
        </>
    )
}
export default MainPage;