import { gettingData, setDone, setErr } from "./data.actions"
import { handleErrors } from "../../utils/utils"

export function fetchDailyEvents(){
    return function(dispatch){
        dispatch(gettingData())

        return fetch('/events/daily')
            .then(handleErrors)
            .then(res => res.json())
            .then((data) => {
                dispatch(setDone(data))
            })
            .catch((err) => {
                setErr(err)
            })
    }
}

export function fetchHourlyEvents(){
    return function(dispatch){
        dispatch(gettingData())

        return fetch('/events/hourly')
            .then(handleErrors)
            .then(res => res.json())
            .then((data) => {
                dispatch(setDone(data))
            })
            .catch((err) => {
                setErr(err)
            })
    }
}