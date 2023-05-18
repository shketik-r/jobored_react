const initialState = {
    catalogues: [],

}
export const cataloguesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CATALOGUES':
            return {
                ...state, catalogues: action.payload
            }
        default:
            return state
    }
}


/*-----------action-----------------*/

export const setCataloguesAC = (params) => ({
    type: 'ADD_CATALOGUES',
    payload: params
})
