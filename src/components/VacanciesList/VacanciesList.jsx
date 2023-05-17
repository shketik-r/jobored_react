import s from './VacanciesList.module.css'
import {NavLink} from "react-router-dom";

function VacanciesList(props) {

    let vacancy = props.vacancies.map((e) => {
        return (
            <div className={s.card} key={e.id} id={e.id}>
                <input type="checkbox"/>
                <NavLink to={`/vacancies/${e.id}/`}>
                    <div>{e.profession}</div>
                </NavLink>
                <div>{e.firmName}</div>
                <div>{e.town}</div>
                <div>{e.typeOfWork}</div>
                {e.paymentFrom>0?(
                    <div>зп от {e.paymentFrom} {e.currency}</div>
                ):'зп не указана'}

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