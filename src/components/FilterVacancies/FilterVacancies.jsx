import React, {useEffect, useState} from "react";
import {getApiVacancies} from "../../utils/network";
import {setFilterAC} from "../../state/filteredReduser";
import {setVacanciesAC} from "../../state/vacanciesReducer";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Group, MantineProvider, NumberInput, rem, Select,} from '@mantine/core';
import {useForm} from '@mantine/form';
import {IconChevronDown, IconDatabase} from "@tabler/icons-react";
import {AiOutlineClose} from "react-icons/ai";

function IconChevronTop(props: { size: number, color: string, stroke: number }) {
    return null;
}

function FilterVacancies({setPages}) {

    const dispatch = useDispatch()
    const storeFilter = useSelector(state => state.filter)
    const storeCatalogues = useSelector(state => state.catalogues.catalogues)

    const handleUploadFile = (value) => {
        dispatch(setFilterAC(value))
        console.log(storeFilter);
        const params = new URLSearchParams();
        params.append('published', storeFilter.published);
        params.append('payment_from', value.paymentFrom);
        params.append('payment_to', value.paymentTo);
        params.append('catalogues', value.catalogues);
        params.append('keyword', storeFilter.keyword);
        params.append('count', 4);
        getApiVacancies(params).then(res => {
            const total = res.data.total
            total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
            dispatch(setVacanciesAC(res.data.objects))
        })
    };


    const option = storeCatalogues.map(e => {
        return {value: e.key, label: e.title}
    })

    const form = useForm({
        initialValues: {
            paymentFrom: '',
            paymentTo: '',
            catalogues: ''
        }
    });

    const deleteAll = () => {
        dispatch(setFilterAC({}))
        form.reset()
        const params = new URLSearchParams();
        params.append('count', 4);
        getApiVacancies(params)
            .then(res => {
                const total = res.data.total
                total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4))
                dispatch(setVacanciesAC(res.data.objects))
            })
    }

    return (

            <form onSubmit={form.onSubmit((values) => handleUploadFile(values))}>
                          <Button variant="subtle" color="dark" size="xs" rightIcon={<AiOutlineClose size="1rem" />} onClick={deleteAll}> очистить все</Button>
                <Select
                    label="Отрасль"
                    radius="md"
                    rightSection={<IconChevronDown size={30} stroke={1} color={'#ACADB9'}/>}
                    styles={{rightSection: {pointerEvents: 'none'}}}
                    rightSectionWidth={40}
                    data={option}
                    {...form.getInputProps('catalogues')}
                />
                <NumberInput
                    label="Оклад"
                    mb='1rem'
                    data-elem="salary-from-input"
                    radius="md"
                    min={0}
                    {...form.getInputProps('paymentFrom')}
                />
                <NumberInput
                    data-elem="salary-to-input"
                    type="number"
                    radius="md"
                    mt="md"
                    min={0}
                    {...form.getInputProps('paymentTo')}
                />
                <Group position="center" mt="md">
                    <Button compact radius="md" size="xl" type="submit">Применить</Button>
                </Group>
            </form>



    )
}

export default FilterVacancies;