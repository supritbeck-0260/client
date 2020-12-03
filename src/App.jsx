import React, { useEffect, useState }  from 'react';
import Navbar from './NavBar/Navbar';
import {Route,Switch} from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import Home from './Home/Home';
import Upload from './upload/Upload';
import Axios from 'axios';
import Detailed from './Detailed/Detailed';
import Signup from './Login/Signup';
import Login from './Login/Login';
const App = ()=>{
const [images, setImages] = useState(null);
const [uploadModal,setUploadModal] = useState(false);
const [isData, setIsData] = useState(false);
const toggleModal = () =>{
    setUploadModal(prev=>!prev);
}
const getImges = (offset)=>{
        Axios.post('http://localhost:5000/getpics',{offset:offset}).then(response=>{
            if(response.data.length){
                setImages(prev=>{
                    if(prev && offset != 0){
                      return [...prev,...response.data];
                    }else{
                      return response.data;
                    } 
                  });
                  setIsData(true);
            }else{
                setIsData(false);
            }
      });
}
useEffect(()=>{
    getImges(0);
},[]);

    return(
        <>
                <Navbar toggleFun={toggleModal}/>
                <Switch>
                    <Route exact path='/' render={()=><Home getFun={getImges} images={images} isData={isData}/>}/>
                    <Route exact path='/profile' render={()=><ProfilePage getFun={getImges} images={images}/>}/>
                    <Route exact path='/detailed/:id' render={()=><Detailed/>}/>
                    <Route exact path='/login' render={()=><Login/>}/>
                    <Route exact path='/signup' render={()=><Signup/>}/>
                    <Route exact path='/token/:id' render={()=><Login/>}/>
                </Switch>
            {uploadModal?<Upload toggleFun={toggleModal} getFun={getImges}/>:null}
        </>
    );
}

export default App;