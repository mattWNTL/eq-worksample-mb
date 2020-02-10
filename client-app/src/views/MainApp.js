import React, {useState, useEffect, createContext} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import ChartView from './ChartView';
import TableView from './TableView';
import GeoView from './GeoView';

const MainApp = () => {
    const {err} = useSelector(store => store.data)

    return(
        <Router>
            <Header/>
            {err &&
                <div className="error">{err}</div>
            }
                <div className="container">
                    <Switch>
                        <Route path="/chart" component={ChartView} />
                        <Route path="/table" component={TableView} />
                        <Route path="/geo" component={GeoView} />
                        <Redirect path="/" to="/chart" />
                    </Switch>
                </div>
            
            
            {/* <Footer /> */}
        </Router>
    )
}

export default MainApp