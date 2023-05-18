import s from './Header.module.css'
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <div className={s.header}>
            <NavLink to={`/`}>
                <div className={s.wrapper_logo}>
                    <div className={s.logo}>
                        <div className={s.ellipse_1}></div>
                        <div className={s.ellipse_2}></div>
                    </div>
                    <span>Jobored</span>
                </div>
            </NavLink>
            <a href="#">Поиск Вакансий</a>
            <NavLink to={'/favorites'}>
                <span>Избранное</span>
            </NavLink>


        </div>
    )

}

export default Header;