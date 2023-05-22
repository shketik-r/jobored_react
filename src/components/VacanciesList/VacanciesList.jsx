import s from './VacanciesList.module.css'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteAC, deleteFavoriteAC} from "../../state/favoriteReduser";
import Check from "./Check/Check";
import {Box, Card, Text,} from "@mantine/core";
import {HiOutlineLocationMarker} from "react-icons/hi";


function VacanciesList({vacancies}) {

    let vacancy = vacancies.map((e) => {

        return (
            <Card data-elem={`vacancy-${e.id}`}
                  padding="md"
                  radius="md"
                  withBorder
                  key={e.id}
                  mb="1rem"
            >
                <Box
                sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'space-between',
                })}
                >
                    <Text weight={500}>
                        <NavLink to={`/vacancies/${e.id}/`}>
                            {e.profession}
                        </NavLink>
                    </Text>
                    <Check
                        obj={e}
                        id={e.id}
                    />

                </Box>


                <Text>
                    {`зп от ${e.payment_from} ${e.currency}`} {e.type_of_work.title}
                </Text>
                <Text>
                   <HiOutlineLocationMarker /> {e.town.title}
                </Text>

            </Card>
        )
    })

    return (
        <>
            {vacancy}
        </>
    )
}

export default VacanciesList;