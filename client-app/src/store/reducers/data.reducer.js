const initialState = {
    loading: false,
    err: null,
    data: []
}

export default function data(state = initialState, action) {
    switch(action.type){
        case 'GETTING_DATA':
            return {
                ...state,
                loading: true
            }
        case 'SET_ERR':
            return {
                ...state,
                loading: false,
                err: action.payload
            }
        case 'SET_DONE':
            return {
                ...state,
                loading: false,
                data: [...action.payload],
                err: null
            }
        default:
            return state
    }
}