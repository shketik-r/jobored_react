const initialState = {
    published: 1,
    keyword: '',
    payment_from: '',
    payment_to: '',
    catalogues: '',
    count: 500
}
export const filteredReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PARAMS_KEY_WORK':
            return {
                ...state, keyword: action.payload
            }
        case 'ADD_PARAMS_PAYMENT_FROM':
            return {
                ...state, payment_from: action.payload
            }
        case 'ADD_PARAMS_PAYMENT_TO':
            return {
                ...state, payment_to: action.payload
            }
        case 'ADD_PARAMS_CATALOGUES':
            return {
                ...state, catalogues: action.payload
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
export const setParamsPaymentFromAC = (params) => ({
    type: 'ADD_PARAMS_PAYMENT_FROM',
    payload: params
})
export const setParamsPaymentToAC = (params) => ({
    type: 'ADD_PARAMS_PAYMENT_TO',
    payload: params
})
export const setParamsCataloguesAC = (params) => ({
    type: 'ADD_PARAMS_CATALOGUES',
    payload: params
})