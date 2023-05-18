import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {filteredReducer} from "./filteredReduser";
import {vacanciesReducer} from "./vacanciesReducer";
import {cataloguesReducer} from "./cataloguesReduser";
import {favoriteReducer} from "./favoriteReduser";

const reducers = combineReducers({
    vacancies: vacanciesReducer, filter: filteredReducer, catalogues: cataloguesReducer, favorite:favoriteReducer
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))











