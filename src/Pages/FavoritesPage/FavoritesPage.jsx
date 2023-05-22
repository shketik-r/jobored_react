import s from './FavoritesPage.module.css'
import React from "react";
import { useSelector} from "react-redux";
import VacanciesList from "../../components/VacanciesList/VacanciesList";

const FavoritesPage = () => {

    const storeFavorite = useSelector(state => state.favorite.favorite)
    console.log( storeFavorite);
   
    return (
        <>
            <VacanciesList
                vacancies={storeFavorite}
                link={true}
            />
        </>
    )
}
export default FavoritesPage;