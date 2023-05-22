import s from "./VacancyInfoPage.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getApiInfo } from "../../utils/network";
import { setVacancyInfoAC } from "../../state/vacanciesReducer";
import { useDispatch, useSelector } from "react-redux";
import VacanciesList from "../../components/VacanciesList/VacanciesList";
import Info from "../../components/Info/Info";
import { Loader } from "@mantine/core";

function VacancyInfoPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const storeVacancyInfo = useSelector((state) => state.vacancies.vacancyInfo);
  const id = useParams().id;
  useEffect(() => {
    setLoading(false);
    getApiInfo(id)
      .then((res) => {
        dispatch(setVacancyInfoAC([res.data]));
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);
console.log(storeVacancyInfo)
  return (
    <>
      {loading ? (
        <div>
          <VacanciesList vacancies={storeVacancyInfo}
          link={false} />
{storeVacancyInfo[0].vacancyRichText!==null? <Info info={storeVacancyInfo} />: false}
        </div>
      ) : (
        <div className={s.loader}>
          <Loader size="5rem" />
        </div>
      )}
    </>
  );
}

export default VacancyInfoPage;
