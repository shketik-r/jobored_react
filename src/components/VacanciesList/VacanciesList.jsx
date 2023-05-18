import s from './VacanciesList.module.css'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteAC, deleteFavoriteAC} from "../../state/favoriteReduser";
import Check from "./Check/Check";


function VacanciesList({vacancies}) {

    let vacancy = vacancies.map((e) => {

        return (
            <div className={s.card} key={e.id} id={e.id}>
                <Check
                obj={e}
                id={e.id}
                />
                <NavLink to={`/vacancies/${e.id}/`}>
                    <div>{e.profession}</div>
                </NavLink>
                <div>{e.firm_name}</div>
                <div>{e.town.title}</div>
                <div>{e.type_of_work.title}</div>
                {e.payment_from > 0 ? (
                    <div>зп от {e.payment_from} {e.currency}</div>
                ) : 'зп не указана'}
            </div>
        )
    })

    return (
        <>
            {vacancy}
        </>
    )
}

export default VacanciesList;