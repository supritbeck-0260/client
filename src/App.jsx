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
const [token,setToken] = useState(localStorage.getItem('token'));
const tokenSet = (token,userID)=>{
      localStorage.setItem('userID',userID)
      localStorage.setItem('token',token);
      setToken(localStorage.getItem('token'));
}
const toggleModal = () =>{
    setUploadModal(prev=>!prev);
}
const getImges = (offset)=>{
        Axios.post('http://localhost:5000/getpics',{offset:offset}).then(response=>{
            console.log(response);
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
                <Navbar token={token} tokenSet={tokenSet} toggleFun={toggleModal}/>
                <Switch>
                    <Route exact path='/' render={()=><Home token={token} getFun={getImges} images={images} isData={isData}/>}/>
                    <Route exact path='/profile/:id' render={()=><ProfilePage token={token} getFun={getImges} images={images}/>}/>
                    <Route exact path='/detailed/:id' render={()=><Detailed token={token}/>}/>
                    <Route exact path='/login' render={()=><Login tokenSet={tokenSet}/>}/>
                    <Route exact path='/signup' render={()=><Signup/>}/>
                    <Route exact path='/token/:id' render={()=><Login tokenSet={tokenSet}/>}/>
                </Switch>
            {uploadModal?<Upload toggleFun={toggleModal} getFun={getImges}/>:null}
        </>
    );
}

export default App;