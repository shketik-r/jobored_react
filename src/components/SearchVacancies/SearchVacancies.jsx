import s from './SearchVacancies.module.css'
import {getApi} from "../../utils/network";
import {useEffect, useState} from "react";
import {URL, URLVacancies} from "../../constans/apiConstants";
import React from "react";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";
import {setParamsKeyWordAC} from "../../state/filteredReduser";

function SearchVacancies(props) {

    const [keyWord, setKeyWord] = useState(``)

    const dispatch = useDispatch()
    const storeFilter = useSelector(state => state.filter)

    const getSearch = async (url) => {

        const params = new URLSearchParams();
        params.append('keyword', storeFilter.keyword);
        params.append('published',storeFilter.published );
        params.append('payment_from',storeFilter.payment_from );
        params.append('payment_to',storeFilter.payment_to );
        params.append('catalogues',storeFilter.catalogues );
        params.append('count', 4)

        const res = await getApi(url,params)


        const total = res.data.total
        if (total >= 500) {
            props.setPages(125)
        } else {
            props.setPages(Math.ceil(total / 4))
        }

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
        dispatch(setVacanciesAC(objectsVacancies))
    }


    useEffect(() => {
        dispatch(setParamsKeyWordAC(keyWord))
    }, [keyWord])

    const handleUploadFile = (event) => {
        event.preventDefault();
        getSearch(URL + URLVacancies)
    };

    return (
        <form action=""  onSubmit={handleUploadFile} >
            <input type="text" value={keyWord} onChange={(e) =>
                setKeyWord(e.target.value)
            }/>
            <input type="submit"/>
        </form>
    )
}

export default SearchVacancies;