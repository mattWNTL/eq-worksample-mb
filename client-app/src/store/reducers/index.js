import { combineReducers } from 'redux';
import data from './data.reducer';
import stats from './stats.reducer';
import events from './events.reducer';
import poi from './poi.reducer';

export default combineReducers({
    data,
    stats,
    events,
    poi
})