import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { Loader, Pagination, Box } from "@mantine/core";
function Header() {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <NavLink to={`/`} className={s.wrapper_logo}>
          <div className={s.logo}>
            <div>
              <div className={s.ellipse_1}></div>
              <div className={s.ellipse_2}></div>
            </div>
            <span>Jobored</span>
          </div>
        </NavLink>

        <div className={s.nav}>
          <NavLink
            to={"/"}
            className={({ isActive }) => (isActive ? s.active : s.a)}
          >
            Поиск Вакансий
          </NavLink>

          <NavLink
            to={"/favorites"}
            className={({ isActive }) => (isActive ? s.active : s.a)}
          >
     
            Избранное
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
