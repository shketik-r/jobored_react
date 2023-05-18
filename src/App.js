import './App.css';

import {Route, Routes} from 'react-router-dom'
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./components/Header/Head";
import VacancyInfoPage from "./Pages/VacanciesInfoPage/VacancyInfoPage";
import {getApi, getApiCatalogues} from "./utils/network";
import {useEffect, useState} from "react";
import {URL, URLA, URLCatalogues} from "./constans/apiConstants";
import {setCataloguesAC} from "./state/cataloguesReduser";
import {useDispatch, useSelector} from "react-redux";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import axios from "axios";

function App() {


    const dispatch = useDispatch()
    // const getCatalogues = async (url) => {
    //     const params = new URLSearchParams();
    //
    //     const res = await getApi(url, params)
    //
    //
    //     const objectsCatalogues = res.data.map((e) => {
    //         return {
    //             title: e.title,
    //             key: e.key
    //         }
    //     })
    //     dispatch(setCataloguesAC(objectsCatalogues))
    // }


    useEffect(() => {
        getApiCatalogues().then(res => {
            const objectsCatalogues = res.data.map((e) => {
                return {
                    title: e.title,
                    key: e.key
                }
            })
            dispatch(setCataloguesAC(objectsCatalogues))
        })
    }, [])


    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/vacancies/:id" element={<VacancyInfoPage/>}/>
                <Route path="/favorites" element={<FavoritesPage/>}/>
            </Routes>
        </div>
    )
}

export default App;

