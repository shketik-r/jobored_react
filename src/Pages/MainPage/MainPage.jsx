import s from './MainPage.module.css'
import {NavLink} from "react-router-dom";

function MainPage(props) {

let objects = props.data.objects
    return (
        <div className={s.page}>
            {objects !== undefined ? objects.map((e) => {

                return (
                    <NavLink to={`/vacancies/${e.id}/`} key={e.id}>
                        <div className={s.card} >
                            <div>{e.profession}</div>
                            <div>{e.firm_name}</div>
                            <div>{e.town.title}</div>
                            <div>{e.type_of_work.title}</div>
                            <div>зп от {e.payment_from} rub</div>
                        </div>
                    </NavLink>
                )
            }) : 'тут должен быть loading!!!'}
        </div>
    )
}

export default MainPage;