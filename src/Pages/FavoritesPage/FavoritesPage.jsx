import s from './FavoritesPage.module.css'
import React from "react";
import { useSelector} from "react-redux";
import VacanciesList from "../../components/VacanciesList/VacanciesList";
import { Navigate } from "react-router-dom";
import { useState } from 'react';

const FavoritesPage = () => {


    const storeFavorite = useSelector(state => state.favorite.favorite)
    console.log( storeFavorite);
   
    
    // if (storeFavorite.length === 0) return <Navigate replace to="/empty" /> ;

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