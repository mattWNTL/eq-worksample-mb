import { gettingData, setDone, setErr } from "./data.actions"
import { handleErrors } from "../../utils/utils"

export function fetchDailyStats(){
    return function(dispatch){
        dispatch(gettingData())

        return fetch(`/stats/daily`)
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

export function fetchHourlyStats(){
    return function(dispatch){
        dispatch(gettingData())

        return fetch(`/stats/hourly`)
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