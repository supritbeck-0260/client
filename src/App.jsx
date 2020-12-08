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
import AuthContex from './Authorization/AuthContex';
const App = ()=>{
let tokenExpairTime = localStorage.getItem('tokenExpairTime');
const tokenAliveFor = 86395000;
const [images, setImages] = useState(null);
const [uploadModal,setUploadModal] = useState(false);
const [isData, setIsData] = useState(false);
const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
const [userID,setUserID] = useState(localStorage.getItem('userID')?localStorage.getItem('userID'):'');
const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('token')?true:false);
const login = (token,userID)=>{
    localStorage.setItem('userID',userID)
    localStorage.setItem('token',token); 
    localStorage.setItem('tokenExpairTime',Date.now()+tokenAliveFor);
    tokenExpairTime = localStorage.getItem('tokenExpairTime');
    logoutTimer();
    setToken(token);
    setUserID(userID);
    setIsLoggedin(true);
}
const logout = ()=>{
    localStorage.removeItem('userID')
    localStorage.removeItem('token'); 
    localStorage.removeItem('tokenExpairTime');
    setToken('');
    setUserID('');
    setIsLoggedin(false);
}
const toggleModal = () =>{
    setUploadModal(prev=>!prev);
}
let logoutCode;
const logoutTimer = ()=>{
    if(tokenExpairTime && tokenExpairTime>Date.now()){
        console.log('time remaining:',tokenExpairTime-Date.now());
        logoutCode=setTimeout(logout,tokenExpairTime-Date.now());
    }else{
        logout();
        clearTimeout(logoutCode);
    } 
}
const getImges = (offset)=>{
        Axios.post(process.env.REACT_APP_SERVER_URL+'/getpics',{offset:offset}).then(response=>{
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
useEffect(logoutTimer,[]);
    return(
        <>
            <AuthContex.Provider value={{
                token:token,
                isLoggedin:isLoggedin,
                userID:userID,
                login:login,
                logout:logout
            }}>
                <Navbar toggleFun={toggleModal}/>
                <Switch>
                    <Route exact path='/' render={()=><Home getFun={getImges} images={images} isData={isData}/>}/>
                    <Route exact path='/profile/:id' render={()=><ProfilePage getFun={getImges} images={images}/>}/>
                    <Route exact path='/detailed/:id' render={()=><Detailed/>}/>
                    <Route exact path='/login' render={()=><Login/>}/>
                    <Route exact path='/signup' render={()=><Signup/>}/>
                    <Route exact path='/token/:id' render={()=><Login/>}/>
                    <Route component={()=><Home getFun={getImges} images={images} isData={isData}/>}/>
                </Switch>
            {uploadModal?<Upload toggleFun={toggleModal} getFun={getImges}/>:null}
            </AuthContex.Provider>
        </>
    );
}

export default App;
export {AuthContex};