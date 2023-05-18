import s from './SearchVacancies.module.css'
import {getApi, getApiVacancies} from "../../utils/network";
import {useEffect, useState} from "react";
import {URL, URLVacancies} from "../../constans/apiConstants";
import React from "react";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";
import {setParamsKeyWordAC} from "../../state/filteredReduser";

function SearchVacancies({setPages}) {

    const [keyWord, setKeyWord] = useState(``)

    const dispatch = useDispatch()
    const storeFilter = useSelector(state => state.filter)

    // const getSearch = async (url) => {
    //
    //     const params = new URLSearchParams();
    //     params.append('keyword', storeFilter.keyword);
    //     params.append('published',storeFilter.published );
    //     params.append('payment_from',storeFilter.payment_from );
    //     params.append('payment_to',storeFilter.payment_to );
    //     params.append('catalogues',storeFilter.catalogues );
    //     params.append('count', 4)
    //
    //     const res = await getApi(url,params)
    //
    //
    //     const total = res.data.total
    //     total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
    //
    //     const objectsVacancies = res.data.objects.map(obj => obj)
    //
    //     dispatch(setVacanciesAC(objectsVacancies))
    // }


    useEffect(() => {
        dispatch(setParamsKeyWordAC(keyWord))
    }, [keyWord])

    const handleUploadFile = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append('published', storeFilter.published);
        params.append('payment_from', storeFilter.payment_from);
        params.append('payment_to', storeFilter.payment_to);
        params.append('catalogues', storeFilter.catalogues);
        params.append('count', 4);
        getApiVacancies(params).then(res=>{
            const total = res.data.total
            total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
            dispatch(setVacanciesAC(res.data.objects))
        })
    };

    return (
        <form action=""  onSubmit={handleUploadFile} >
            <input data-elem="search-input" type="text" value={keyWord} onChange={(e) =>
                setKeyWord(e.target.value)
            }/>
            <input data-elem="search-button" type="submit"/>
        </form>
    )
}

export default SearchVacancies;