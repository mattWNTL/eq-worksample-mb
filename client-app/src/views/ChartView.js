import React, {useState, useEffect} from 'react';
import Chart from './components/Chart';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDailyEvents, fetchHourlyEvents } from '../store/actions/events.actions';
import { fetchDailyStats, fetchHourlyStats } from '../store/actions/stats.actions';

const ChartView = () => {
    const data = useSelector(state => state.data.data)
    const [dataType, setDataType] = useState('dailyStats')    

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchDailyStats())
    }, [])

    const toggleDataType = (val) =>{
        switch(val){
            case 'dailyStats':
                dispatch(fetchDailyStats())
                setDataType(val)
                break;
            case 'hourlyStats':
                dispatch(fetchHourlyStats())
                setDataType(val)
                break;
            case 'dailyEvents':
                dispatch(fetchDailyEvents())
                setDataType(val)
                break;
            case 'hourlyEvents':
                dispatch(fetchHourlyEvents())
                setDataType(val)
                break;
        }
    }
    return(
        <div className="card mt-3 p-3">
            <div className={"form-row justify-content-between"}>
                <div className={"form-inline my-2 my-lg-0"}>
                    <select className={"form-control"} value={dataType} onChange={(e) => toggleDataType(e.target.value)}>
                        <option value="dailyStats">Daily Stats</option>
                        <option value="hourlyStats">Hourly Stats</option>
                        <option value="dailyEvents">Daily Events</option>
                        <option value="hourlyEvents">Hourly Events</option>
                    </select>
                </div>
            </div>
            <hr/>
            <Chart data={data} dataType={dataType}/>
        </div>
    )
}

export default ChartView