const initialState = {
    published: 1,
    keyword: '',
    filter:{
        paymentFrom: '',
        paymentTo: '',
        catalogues: ''
    },
    count: 500
}
export const filteredReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PARAMS_KEY_WORK':
            return {
                ...state, keyword: action.payload
            }
        case 'ADD_FILTER':
            return {
                ...state, filter: action.payload
            }
        default:
            return state
    }
}


/*-----------action-----------------*/

export const setParamsKeyWordAC = (params) => ({
    type: 'ADD_PARAMS_KEY_WORK',
    payload: params
})

export const setFilterAC = (params) => ({
    type: 'ADD_FILTER',
    payload: params
})