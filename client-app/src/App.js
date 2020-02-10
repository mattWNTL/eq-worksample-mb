import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainApp from './views/MainApp';
import {store} from './store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
