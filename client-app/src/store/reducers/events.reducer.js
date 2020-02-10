const initialState = {
    data: [],
    filter: 'daily'
}

export default function events(state = initialState, action) {
    switch(action.type){
        case 'GET_DAILY_EVENTS':
            return {
                ...state,
                filter: 'daily'
            }
        case 'SET_DAILY_EVENTS':
            return {
                ...state,
                data: [...action.payload],
            }
        case 'GET_HOURLY_EVENTS':
            return {
                ...state,
                filter: 'hourly'
            }
        case 'GET_HOURLY_EVENTS':
            return {
                ...state,
                data: [...action.payload]
            }
        default:
            return state
    }
}