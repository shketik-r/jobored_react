import React, {useEffect} from "react";

import s from './FilterVacancies.module.css'
import {getApi, getApiVacancies} from "../../utils/network";
import {useState} from "react";
import {URL, URLVacancies} from "../../constans/apiConstants";
import {
    setParamsPaymentFromAC,
    setParamsPaymentToAC,
    setParamsCataloguesAC,
} from "../../state/filteredReduser";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";
import {TextInput, Checkbox, Button, Group, Box, rem, MantineProvider, NumberInput,} from '@mantine/core';
import {useForm} from '@mantine/form';



function FilterVacancies({setPages}) {

    const [catalogues, setCatalogues] = useState(``);
    const [paymentFrom, setPaymentFrom] = useState(``);
    const [paymentTo, setPaymentTo] = useState(``);

    const dispatch = useDispatch()
    const storeFilter = useSelector(state => state.filter)
    const storeCatalogues = useSelector(state => state.catalogues.catalogues)

    // const getSearch = async (url) => {
    //     const params = new URLSearchParams();
    //     params.append('published', storeFilter.published);
    //     params.append('payment_from', storeFilter.payment_from);
    //     params.append('payment_to', storeFilter.payment_to);
    //     params.append('catalogues', storeFilter.catalogues);
    //     params.append('count', 4);
    //
    //     const res = await getApi(url, params)
    //
    //     const total = res.data.total
    //     total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
    //
    //     const objectsVacancies = res.data.objects.map(obj => obj)
    //     dispatch(setVacanciesAC(objectsVacancies))
    // }


    useEffect(() => {
        dispatch(setParamsPaymentFromAC(paymentFrom))
        dispatch(setParamsPaymentToAC(paymentTo))
        dispatch(setParamsCataloguesAC(catalogues))
    }, [catalogues, paymentFrom, paymentTo])

    const handleUploadFile = (event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        params.append('published', storeFilter.published);
        params.append('payment_from', storeFilter.payment_from);
        params.append('payment_to', storeFilter.payment_to);
        params.append('catalogues', storeFilter.catalogues);
        params.append('count', 4);
        getApiVacancies(params).then(res => {
            const total = res.data.total
            total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
            dispatch(setVacanciesAC(res.data.objects))
        })
    };

    /*-----------------------------*/

    const catalog = storeCatalogues.map(e => {
        return (
            <option key={e.key} value={e.key}>{e.title}</option>
        )
    })
    const deleteAll = () => {
        setCatalogues('')
        setPaymentFrom('')
        setPaymentTo('')
        const params = new URLSearchParams();
        params.append('count', 4);
        getApiVacancies(params)
            .then(res => {
                const total = res.data.total
                total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
                dispatch(setVacanciesAC(res.data.objects))
            })
    }


    const form = useForm({
        initialValues: {
            paymentFrom: '',
            paymentTo: ''
        }
    });

    return (
        <>
            < MantineProvider>

                <Box maw={300} mx="auto">
                    <form onSubmit={form.onSubmit((values) => console.log(values))}>


                            <NumberInput
                                label="Оклад"
                                data-elem="salary-from-input"
                                radius="md"
                                type="number"
                            />
                            <NumberInput
                                data-elem="salary-to-input"
                                type="number"
                                radius="md"

                            />



                        <Group position="center" mt="md">
                            <Button compact radius="md" size="xl" type="submit">Применить</Button>
                        </Group>
                    </form>
                </Box>

            </MantineProvider>


            <form action="" onSubmit={handleUploadFile}>
                <span onClick={deleteAll}> очистить все</span>
                <span>Отрасль</span>

                <select data-elem="industry-select" onChange={(event) => setCatalogues(event.target.value)}>
                    {catalog}
                </select>

                <span>Оклад</span>

                <input data-elem="salary-from-input" type="number" value={paymentFrom} onChange={(e) =>
                    setPaymentFrom(e.target.value)
                }/>

                <input data-elem="salary-to-input" type="number" value={paymentTo} onChange={(e) =>
                    setPaymentTo(e.target.value)
                }/>
                <input data-elem="search-button" type="submit"/>
            </form>
        </>
    )

}

export default FilterVacancies;