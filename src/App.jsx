import React from 'react';
import Navbar from './NavBar/Navbar';
import { Provider } from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import { createStore } from 'redux';
import mainReducer from './Redux/Index'; 
import ProfilePage from './profile/ProfilePage';
import Home from './Home/Home';
const App = ()=>{
const mainStore = createStore(mainReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return(
        <>
            <Provider store={mainStore}>
                <Navbar/>
                <Switch>
                    <Route exact path='/' render={()=><Home/>}/>
                    <Route exact path='/profile' render={()=><ProfilePage/>}/>
                
                </Switch>
            </Provider>
        </>
    );
}

export default App;