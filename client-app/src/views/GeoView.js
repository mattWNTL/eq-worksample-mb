import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPOI } from '../store/actions/poi.actions';
import GeoMap from './components/Map';

const GeoView = () => {
    const {data} = useSelector(state => state.data) 
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!navigator.geolocation) {
            setLat(43.651070)
            setLong(-79.347015)
        } else {
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
        }

        dispatch(fetchPOI())
    }, [])

    function locationSuccess(position){
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLat(latitude)
        setLong(longitude)
    }

    function locationError(){
        //toronto
        setLat(43.651070)
        setLong(-79.347015)
    }

    return(
        <div className="card mt-3 p-3" style={{height: 600, width: 1000, margin: 'auto'}}>
            <GeoMap data={data} lat={lat} long={long}/>
        </div>
    )
}

export default GeoView