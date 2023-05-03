import s from './Header.module.css'

function Header() {
    return (
        <div className={s.header}>
            <div className={s.wrapper_logo}>
                <div className={s.logo}>
                    <div className={s.ellipse_1}></div>
                    <div className={s.ellipse_2}></div>
                </div>
                <span>Jobored</span>
            </div>

            <a href="#">Поиск Вакансий</a>
            <a href="#">Избранное</a>
        </div>
    )

}

export default Header;