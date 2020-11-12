import React, { useEffect, useState }  from 'react';
import Navbar from './NavBar/Navbar';
import { Provider } from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import { createStore } from 'redux';
import mainReducer from './Redux/Index'; 
import ProfilePage from './profile/ProfilePage';
import Home from './Home/Home';
import Upload from './upload/Upload';
import Axios from 'axios';
const App = ()=>{
const [images, setImages] = useState(null);
const [uploadModal,setUploadModal] = useState(false);
const toggleModal = () =>{
    setUploadModal(prev=>!prev);
}
const getImges = ()=>{
        Axios.get('http://localhost:5000/getpics').then(response=>{
          setImages(response.data);
      });
}
useEffect(()=>{
    getImges();
},[]);

    return(
        <>
                <Navbar toggleFun={toggleModal}/>
                <Switch>
                    <Route exact path='/' render={()=><Home images={images}/>}/>
                    <Route exact path='/profile' render={()=><ProfilePage/>}/>
                
                </Switch>
            {uploadModal?<Upload toggleFun={toggleModal} getFun={getImges}/>:null}
        </>
    );
}

export default App;