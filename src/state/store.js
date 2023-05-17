import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {filteredReducer} from "./filteredReduser";
import {vacanciesReducer} from "./vacanciesReducer";

const reducers = combineReducers({
    vacancies: vacanciesReducer, filter: filteredReducer
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))











