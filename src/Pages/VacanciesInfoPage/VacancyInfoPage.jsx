import s from "./VacancyInfoPage.module.css";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router";
import { getApi, getApiInfo } from "../../utils/network";
import { URL, URLVacancies } from "../../constans/apiConstants";
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
    getApiInfo(id)
      .then((res) => {
        dispatch(setVacancyInfoAC([res.data]));
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <VacanciesList vacancies={storeVacancyInfo} />
          <Info info={storeVacancyInfo} />
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
