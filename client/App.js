import { hot } from 'react-hot-loader/root';
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter';
import './assets/css/App.css'
import './../node_modules/slick-carousel/slick/slick.css'
import "./../node_modules/slick-carousel/slick/slick-theme.css";
import {GlobalProvider} from './context/GlobalContext'


const App =()=> {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>
        </GlobalProvider>
    )
}

export default App