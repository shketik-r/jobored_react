import './App.css';
import {Route, Routes, Navigate} from 'react-router-dom'
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./components/Header/Head";
import VacancyInfoPage from "./Pages/VacanciesInfoPage/VacancyInfoPage";
import {getApiCatalogues} from "./utils/network";
import {useEffect} from "react";
import {setCataloguesAC} from "./state/cataloguesReduser";
import {useDispatch,useSelector} from "react-redux";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import {MantineProvider} from "@mantine/core";
import   EmptyStatePage from "./Pages/EmptyStatePage/EmptyStatePage";

function App() {
    const dispatch = useDispatch()
    const storeFavorite = useSelector(state => state.favorite.favorite)
    useEffect(() => {
        // if (localStorage.getItem('token') === null) {
        //     getToken()
        //         .then(res => {
        //             setLocalStorage('token', res.data.access_token)
        //         })
        // }
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
                        <Route path="/favorites" element={storeFavorite.length!==0?<FavoritesPage/>:<Navigate to="/empty"/> }/>
                        <Route path="/empty" element={<EmptyStatePage/>}/>
                    </Routes>
                </div>
            </div>
        </MantineProvider>
    )
}
export default App;

