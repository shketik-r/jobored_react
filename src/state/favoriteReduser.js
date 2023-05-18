

const initialState = {
    favorite: []
}
export const favoriteReducer = (state = initialState, action) => {


    switch (action.type) {
        case 'ADD_FAVORITE':
            let newObj = action.payload
            return {...state, favorite: [...state.favorite, newObj]};

        case 'DELETE_FAVORITE':
            let id = action.payload
            return {...state, favorite: [...state.favorite.filter(e => e.id !== id)]}
        default:
            return state
    }
}


/*-----------action-----------------*/

export const addFavoriteAC = (params) => ({
    type: 'ADD_FAVORITE',
    payload: params
})

export const deleteFavoriteAC = (params) => ({
    type: 'DELETE_FAVORITE',
    payload: params
})