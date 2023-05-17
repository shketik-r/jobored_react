import {createStore} from "redux";



const initialState = {
    vacancies:null,
    vacancyInfo:null,
    paramsFilter:{
        published:1,
        keyword:'',
        payment_from:'',
        payment_to:'',
        catalogues:''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_VACANCIES' :
            return {
        ...state, vacancies: action.payload
            }
        case 'ADD_VACANCY_INFO':
            return {
                ...state ,vacancyInfo: action.payload
            }
        case 'ADD_PARAMS_FILTER':
            return {
                ...state ,paramsFilter: action.payload
            }
        default:
            return state
    }
}


export const store = createStore(reducer)

/*-----------action-----------------*/
export const setVacancies = (vacancies) => ({
    type: 'ADD_VACANCIES',
    payload: vacancies
})

export const setVacancyInfo = (vacancyInfo) => ({
    type: 'ADD_VACANCY_INFO',
    payload: vacancyInfo
})

export const setParamsFilter = (params) => ({
    type: 'ADD_PARAMS_FILTER',
    payload: params
})