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

function FilterVacancies(props) {

    const [catalogues, setCatalogues] = useState(``);
    const [paymentFrom, setPaymentFrom] = useState(``);
    const [paymentTo, setPaymentTo] = useState(``);

    const dispatch = useDispatch()
    const storeFilter = useSelector(state => state.filter)

    const getSearch = async (url) => {
        const params = new URLSearchParams();
        params.append('published', storeFilter.published);
        params.append('payment_from', storeFilter.payment_from);
        params.append('payment_to', storeFilter.payment_to);
        params.append('catalogues', storeFilter.catalogues);
        params.append('count', 4);

        const res = await getApi(url, params)

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
        dispatch(setParamsPaymentFromAC(paymentFrom))
        dispatch(setParamsPaymentToAC(paymentTo))
        dispatch(setParamsCataloguesAC(catalogues))
    }, [catalogues, paymentFrom, paymentTo])

    const handleUploadFile = (event) => {
        event.preventDefault();
        getSearch(URL + URLVacancies)
    };

    /*-----------------------------*/

    return (
        <>
            <form action="" onSubmit={handleUploadFile}>
                <span>Отрасль</span>

                <input type="text" value={catalogues} onChange={(e) =>
                    setCatalogues(e.target.value)
                }/>

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