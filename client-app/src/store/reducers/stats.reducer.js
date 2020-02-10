const initialState = {
    data: [],
    filter: 'daily'
}

export default function stats(state = initialState, action) {

    switch(action.type){
        case 'GET_DAILY_STATS':
            return {
                ...state,
                filter: 'daily'
            }
        case 'SET_DAILY_STATS':
            return {
                ...state,
                data: [...action.payload]
            }
        case 'GET_HOURLY_STATS':
            return {
                ...state,
                filter: 'hourly'
            }
        case 'SET_HOURLY_STATS':
            return {
                ...state,
                data: [...action.payload]
            }
        default:
            return state
    }
}