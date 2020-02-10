import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPOI } from '../store/actions/poi.actions';
import GeoMap from './components/Map';

const GeoView = () => {
    const {loading, data} = useSelector(state => state.data) 
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPOI())
    }, [])

    return(
        <div className="card mt-3 p-3" style={{height: 600, width: 1000, margin: 'auto'}}>
            <GeoMap data={data}/>
        </div>
    )
}

export default GeoView