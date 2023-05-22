import s from "./SearchVacancies.module.css";
import { getApiVacancies } from "../../utils/network";
import React from "react";
import { setVacanciesAC } from "../../state/vacanciesReducer";
import { useDispatch, useSelector } from "react-redux";
import { setParamsKeyWordAC } from "../../state/filteredReduser";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CiSearch } from "react-icons/ci";

function SearchVacancies({ setPages }) {
  const dispatch = useDispatch();
  const storeFilter = useSelector((state) => state.filter);
  
  const handleUploadFile = (values) => {
    dispatch(setParamsKeyWordAC(values.keyWord));
    const params = new URLSearchParams();
    params.append("published", storeFilter.published);
    params.append("payment_from", storeFilter.filter.paymentFrom);
    params.append("payment_to", storeFilter.filter.paymentTo);
    params.append("catalogues", storeFilter.filter.catalogues);
    params.append("keyword", values.keyWord);
    params.append("count", 4);
    getApiVacancies(params).then((res) => {
      const total = res.data.total;
      total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4));
      dispatch(setVacanciesAC(res.data.objects));
    })
  };
  const form = useForm({
    initialValues: {
      keyWord: "",
    },
  });

  return (
    <Box maw={773} mx="auto" mb="1rem">
      <form onSubmit={form.onSubmit((values) => handleUploadFile(values))}>
        <TextInput
          icon={<CiSearch />}
          data-elem="search-input"
          radius="0.5rem"
          placeholder={"Введите название вакансии"}
          {...form.getInputProps("keyWord")}
          rightSection={
            <Button
              data-elem="search-button"
              compact
              radius="0.5rem"
              type="submit"
            >
              Поиск
            </Button>
          }
          rightSectionWidth={75}
        />
      </form>
    </Box>
  );
}

export default SearchVacancies;
