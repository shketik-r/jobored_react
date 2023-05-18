import s from './VacanciesList.module.css'
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFavoriteAC, deleteFavoriteAC} from "../../state/favoriteReduser";


function VacanciesList({vacancies}) {

    const [favorite, setFavorite] = useState(false)

    const storeFavorite = useSelector(state => state.favorite.favorite)


    const dispatch = useDispatch()

    const add = (obj) => {
        dispatch(addFavoriteAC(obj))
    }
    const remove = (id) => {
        dispatch(deleteFavoriteAC(id))
    }

    let vacancy = vacancies.map((e) => {

        return (
            <div className={s.card} key={e.id} id={e.id}>
                {favorite ? <button onClick={() => remove(e.id)}>delete</button> :
                    <button onClick={() => add(e)}>add</button>}
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