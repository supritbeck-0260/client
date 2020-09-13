import React from 'react';
import Navbar from './NavBar/Navbar';
import Grid from './profile/Grid';
import ImageGridList from './profile/ImageGridList';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './Redux/Index'; 
const App = ()=>{
const mainStore = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return(
        <>
            <Provider store={mainStore}>
                <Navbar/>
                <Grid/>
                <hr/>
                <ImageGridList/>
            </Provider>
        </>
    );
}

export default App;