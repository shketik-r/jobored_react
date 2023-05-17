const initialState = {
    vacancies:null,
    vacancyInfo:null,
}

export const vacanciesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_VACANCIES' :
            return {
                ...state, vacancies: action.payload
            }
        case 'ADD_VACANCY_INFO':
            return {
                ...state ,vacancyInfo: action.payload
            }
        default:
            return state
    }
}


/*-----------action-----------------*/
export const setVacanciesAC = (vacancies) => ({
    type: 'ADD_VACANCIES',
    payload: vacancies
})

export const setVacancyInfoAC = (vacancyInfo) => ({
    type: 'ADD_VACANCY_INFO',
    payload: vacancyInfo
})
