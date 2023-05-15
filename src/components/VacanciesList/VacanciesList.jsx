import s from './VacancyCard.module.css'
import {NavLink} from "react-router-dom";

function VacancyCard(props) {
    return (
        <div className={s.card} key={props.id} id={props.id}>
            <input type="checkbox" />
            <NavLink to={`/vacancies/${props.id}/`}>
                <div>{props.profession}</div>
            </NavLink>
            <div>{props.firmName}</div>
            <div>{props.town}</div>
            <div>{props.typeOfWork}</div>
            <div>зп от {props.paymentFrom} rub</div>
        </div>
    )

}

export default VacancyCard;