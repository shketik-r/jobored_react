import './App.css';

import {Route, Routes} from 'react-router-dom'
import MainPage from "./Pages/MainPage/MainPage";
import Header from "./components/Header/Head";
import VacancyPage from "./Pages/VacanciesPage/VacancyPage";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/vacancies/:id" element={<VacancyPage/>}/>
            </Routes>
        </div>
    )
}

export default App;

