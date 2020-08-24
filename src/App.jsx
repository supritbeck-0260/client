import React from 'react';
import Navbar from './NavBar/Navbar';
import Grid from './profile/Grid';
import ImageGridList from './profile/ImageGridList';
const App = ()=>{
    return(
        <>
            <Navbar/>
            <Grid/>
            <hr/>
            <ImageGridList/>
        </>
    );
}

export default App;