import { gettingData, setDone, setErr } from "./data.actions"
import { handleErrors } from "../../utils/utils"

export function fetchPOI(){
    return function(dispatch){
        dispatch(gettingData())

        return fetch(`/poi`)
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