import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import './index.css'
import {store} from "./state/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <HashRouter> 
             <App/>
        </HashRouter>
    </Provider>

);

reportWebVitals();
