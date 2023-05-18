import React, {useEffect} from "react";

import s from './FilterVacancies.module.css'
import {getApi} from "../../utils/network";
import {useState} from "react";
import {URL, URLVacancies} from "../../constans/apiConstants";
import {
    setParamsPaymentFromAC,
    setParamsPaymentToAC,
    setParamsCataloguesAC,
} from "../../state/filteredReduser";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";

function FilterVacancies({setPages}) {

    const [catalogues, setCatalogues] = useState(``);
    const [paymentFrom, setPaymentFrom] = useState(``);
    const [paymentTo, setPaymentTo] = useState(``);

    const dispatch = useDispatch()
    const storeFilter = useSelector(state => state.filter)
    const storeCatalogues = useSelector(state => state.catalogues.catalogues)

    const getSearch = async (url) => {
        const params = new URLSearchParams();
        params.append('published', storeFilter.published);
        params.append('payment_from', storeFilter.payment_from);
        params.append('payment_to', storeFilter.payment_to);
        params.append('catalogues', storeFilter.catalogues);
        params.append('count', 4);

        const res = await getApi(url, params)

        const total = res.data.total
        total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))

        const objectsVacancies = res.data.objects.map(obj => obj)
        dispatch(setVacanciesAC(objectsVacancies))
    }


    useEffect(() => {
        dispatch(setParamsPaymentFromAC(paymentFrom))
        dispatch(setParamsPaymentToAC(paymentTo))
        dispatch(setParamsCataloguesAC(catalogues))
    }, [catalogues, paymentFrom, paymentTo])

    const handleUploadFile = (event) => {
        event.preventDefault();
        getSearch(URL + URLVacancies)
    };

    /*-----------------------------*/

const catalog = storeCatalogues.map(e=>{

    return (
        <option key={e.key} value={e.key} >{e.title}</option>
    )

})
const deleteAll = () => {
    setCatalogues('')
    setPaymentFrom('')
    setPaymentTo('')
    getSearch(URL + URLVacancies)
}
    return (
        <>
            <form action="" onSubmit={handleUploadFile}>
                <span onClick={deleteAll}> очистить все</span>
                <span>Отрасль</span>

                <select  onChange={(event) => setCatalogues(event.target.value)} >
                    {catalog}
                </select>

                <span>Оклад</span>

                <input type="number" value={paymentFrom} onChange={(e) =>
                    setPaymentFrom(e.target.value)
                }/>

                <input type="number" value={paymentTo} onChange={(e) =>
                    setPaymentTo(e.target.value)
                }/>
                <input type="submit"/>
            </form>
        </>
    )

}

export default FilterVacancies;