export const gettingData = () =>{
    return {
        type: 'GETTING_DATA'
    }
}

export const setErr = (err) =>{
    return {
        type: 'SET_ERR',
        payload: err
    }
}

export const setDone = (data) =>{
    return {
        type: 'SET_DONE',
        payload: [...data]
    }
}
