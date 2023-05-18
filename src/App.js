import './App.css';

import {Route, Routes} from 'react-router-dom'
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./components/Header/Head";
import VacancyInfoPage from "./Pages/VacanciesInfoPage/VacancyInfoPage";
import {getToken, getApiCatalogues} from "./utils/network";
import {useEffect, useState} from "react";
import {setCataloguesAC} from "./state/cataloguesReduser";
import {useDispatch} from "react-redux";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";

import {setLocalStorage} from "./utils/localStorage";

function App() {


    const dispatch = useDispatch()

    useEffect(() => {

        if (localStorage.getItem('token') === null) {
            getToken()
                .then(res => {

                    setLocalStorage('token', res.data.access_token)
                })
        }

        getApiCatalogues()
            .then(res => {
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

