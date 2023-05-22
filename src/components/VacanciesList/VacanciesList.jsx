import s from "./VacanciesList.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteAC, deleteFavoriteAC } from "../../state/favoriteReduser";
import Check from "./Check/Check";
import { Box, Card, Text } from "@mantine/core";
import { HiOutlineLocationMarker } from "react-icons/hi";

function VacanciesList({ vacancies }) {
  let vacancy = vacancies.map((e) => {
    return (
      <Card
        data-elem={`vacancy-${e.id}`}
        padding="md"
        radius="0.75rem"
        withBorder
        key={e.id}
        mb="1rem"
      >
        <Box
          sx={() => ({
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            marginBottom: "0.76rem",
          })}
        >
          <NavLink to={`/vacancies/${e.id}/`}>{e.profession}</NavLink>
          <Check obj={e} id={e.id} />
        </Box>
        <Box
          sx={() => ({
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            alignItems: "center",
            fontSize: " 1.25rem",
            lineHeight: "1.25rem",
            color: "#232134",
            marginBottom: "0.76rem",
          })}
        >
          <span
            className={s.payment}
          >{`зп от ${e.payment_from} ${e.currency}`}</span>{" "}
          <span className={s.dot}></span> <span>{e.type_of_work.title}</span>
        </Box>
        <Box
              sx={() => ({
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                fontSize: " 1rem",
                lineHeight: "1.25rem",
                color: "#232134",
                marginBottom: "0.76rem",
              })}
        >
          <HiOutlineLocationMarker color="#ACADB9" /> <span className={s.name_town}>{e.town.title}</span>
        </Box>
      </Card>
    );
  });

  return <>{vacancy}</>;
}

export default VacanciesList;
