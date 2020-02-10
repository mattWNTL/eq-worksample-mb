import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import DataTable from './components/DataTable';
import { fetchPOI } from '../store/actions/poi.actions';

const TableView = () => {
    const {loading, data} = useSelector(state => state.data) 
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchPOI())
    }, [])

    return(
        <div className={"card mt-3 p-3"}>
            {loading ? 
                <div className="loader"></div>
                :
                <DataTable data={data}/>
            }
        </div>
    )
}

export default TableView