import s from "./FilterVacancies.module.css";
import React from "react";
import { getApiVacancies } from "../../utils/network";
import { setFilterAC } from "../../state/filteredReduser";
import { setVacanciesAC } from "../../state/vacanciesReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Group,
  NumberInput,
  rem,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons-react";
import { AiOutlineClose } from "react-icons/ai";
import { Navigate } from "react-router-dom";

function FilterVacancies({ setPages }) {
  const dispatch = useDispatch();
  const storeFilter = useSelector((state) => state.filter);
  const storeCatalogues = useSelector((state) => state.catalogues.catalogues);
  
  const handleUploadFile = (value) => {
    dispatch(setFilterAC(value));
    const params = new URLSearchParams();
    params.append("published", storeFilter.published);
    params.append("payment_from", value.paymentFrom);
    params.append("payment_to", value.paymentTo);
    params.append("catalogues", value.catalogues);
    params.append("keyword", storeFilter.keyword);
    params.append("count", 4);
    getApiVacancies(params)
      .then((res) => {
        const total = res.data.total;
        total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4));
        dispatch(setVacanciesAC(res.data.objects));
      })
  };

  const option = storeCatalogues.map((e) => {
    return { value: e.key, label: e.title };
  });

  const form = useForm({
    initialValues: {
      paymentFrom: "",
      paymentTo: "",
      catalogues: "",
    },
  });

  const deleteAll = () => {
    dispatch(setFilterAC({}));
    form.reset();
    const params = new URLSearchParams();
    params.append("count", 4);
    getApiVacancies(params).then((res) => {
      const total = res.data.total;
      total >= 500 ? setPages(125) : setPages(Math.ceil(total / 4));
      dispatch(setVacanciesAC(res.data.objects));
    });
  };

  return (
    <Box maw={773} mx="auto" mb="1.5rem">
      <form
        className={s.wrapper}
        onSubmit={form.onSubmit((values) => handleUploadFile(values))}
      >
        <div className={s.wrapper_title}>
          <span className={s.title}>Фильтры</span>
          <div className={s.btn_close} onClick={deleteAll}>
            <span className={s.text_close}>Сбросить все</span>
            <AiOutlineClose size="0.7rem" />
          </div>
        </div>
        <Select
          data-elem="industry-select"
          label="Отрасль"
          placeholder="Выберете отрасль"
          radius="0.5rem"
          mb="1.25rem"
          rightSection={
            <IconChevronDown size={30} stroke={1} color={"#ACADB9"} />
          }
          styles={{ rightSection: { pointerEvents: "none" } }}
          rightSectionWidth={40}
          data={option}
          {...form.getInputProps("catalogues")}
        />
        <NumberInput
          label="Оклад"
          mb="0.5rem"
          data-elem="salary-from-input"
          radius="0.5rem"
          min={0}
          placeholder="От"
          {...form.getInputProps("paymentFrom")}
        />
        <NumberInput
          data-elem="salary-to-input"
          type="number"
          radius="0.5rem"
          mb="1.25rem"
          min={0}
          placeholder="До"
          {...form.getInputProps("paymentTo")}
        />
        <Group position="center" mt="md">
          <Button
            data-elem="search-button"
            compact
            radius="0.5rem"
            size={rem(14)}
            type="submit"
            fullWidth
            styles={() => ({
              root: {
                height: rem(40),
              },
            })}
          >
            Применить
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default FilterVacancies;
