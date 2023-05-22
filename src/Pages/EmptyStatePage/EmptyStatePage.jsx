import s from "./EmptyStatePage.module.css";
import React from "react";
import img from "./img/emptystate.jpg";
import { NavLink } from "react-router-dom";
import { Button } from "@mantine/core";

const EmptyStatePage = () => {
  return (
    <div className={s.wrapper}>
      <img className={s.img} src={img} alt="emptystate" />
      <p>Упс, здесь еще ничего нет!</p>
      <NavLink to={"/"}><Button  variant="light" color="cyan" radius="md" size="md">Поиск Вакансий</Button></NavLink>
    </div>
  );
};
export default EmptyStatePage;
