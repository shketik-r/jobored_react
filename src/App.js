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
import {MantineProvider} from "@mantine/core";

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
        <MantineProvider
            theme={{
                // Override any other properties from default theme
                fontFamily: 'Inter',
                fontStyle: 'normal',
                color:"#232134",
                spacing: {xs: '1rem', sm: '1.2rem', md: '1.8rem', lg: '2.2rem', xl: '2.8rem'},
            }}
            withGlobalStyles
            withNormalizeCSS
        >
            <div className="App">
                <Header/>
                <div className='container'>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/vacancies/:id" element={<VacancyInfoPage/>}/>
                        <Route path="/favorites" element={<FavoritesPage/>}/>
                    </Routes>
                </div>
            </div>
        </MantineProvider>
    )
}

export default App;

