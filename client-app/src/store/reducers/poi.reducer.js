const initialState = {
    data: []
}

export default function poi(state = initialState, action) {
    switch(action.type){
        case 'GET_POI':
            return {
                ...state
            }
        case 'SET_POI':
            return {
                ...state,
                data: [...action.payload]
            }
        default:
            return state
    }
}