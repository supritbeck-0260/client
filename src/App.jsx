import React, { useEffect, useState }  from 'react';
import Navbar from './NavBar/Navbar';
import {Route,Switch} from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import Home from './Home/Home';
import Upload from './upload/Upload';
import Detailed from './Detailed/Detailed';
import Signup from './Login/Signup';
import Login from './Login/Login';
import AuthContex from './Contex/AuthContex';
import ServicesContex from './Contex/ServicesContex';
import connect from './Socket/Connect';
const App = ()=>{
let tokenExpairTime = localStorage.getItem('tokenExpairTime');
const tokenAliveFor = 86395000;
const [uploadModal,setUploadModal] = useState(false);
const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
const [userID,setUserID] = useState(localStorage.getItem('userID')?localStorage.getItem('userID'):'');
const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('token')?true:false);
const [avatar,setAvatar] = useState(localStorage.getItem('avatar'));
const [reload,setReload] = useState(false);
const login = (token,userID,avatar)=>{
    localStorage.setItem('userID',userID)
    localStorage.setItem('token',token); 
    localStorage.setItem('avatar',avatar);
    localStorage.setItem('tokenExpairTime',Date.now()+tokenAliveFor);
    tokenExpairTime = localStorage.getItem('tokenExpairTime');
    logoutTimer();
    setToken(token);
    setUserID(userID);
    setAvatar(avatar);
    setIsLoggedin(true);
}
const logout = ()=>{
    localStorage.removeItem('userID')
    localStorage.removeItem('token'); 
    localStorage.removeItem('tokenExpairTime');
    localStorage.removeItem('avatar');
    setToken('');
    setUserID('');
    setAvatar('');
    setIsLoggedin(false);
}
const toggleModal = () =>{
    setUploadModal(prev=>!prev);
}
const updateContex = (avatar)=>{
        setReload(prev=>!prev);
        if(avatar){
        localStorage.setItem('avatar',avatar);
        setAvatar(avatar);
        }
}
let logoutCode;
const logoutTimer = ()=>{
    if(tokenExpairTime && tokenExpairTime>Date.now()){
        logoutCode=setTimeout(logout,tokenExpairTime-Date.now());
        connect(userID);
    }else{
        logout();
        clearTimeout(logoutCode);
    } 
}
useEffect(logoutTimer,[]);
    return(
        <>
            <AuthContex.Provider value={{
                token:token,
                avatar:avatar,
                isLoggedin:isLoggedin,
                userID:userID,
                login:login,
                logout:logout
            }}>
            <ServicesContex.Provider
                value={{
                    reload:reload,
                    updateContex:updateContex
                }}
            >
                <Navbar toggleFun={toggleModal}/>
                <Switch>
                    <Route exact path='/' render={()=><Home/>}/>
                    <Route exact path='/profile/:id' render={()=><ProfilePage/>}/>
                    <Route exact path='/detailed/:id' render={()=><Detailed/>}/>
                    <Route exact path='/login' render={()=><Login/>}/>
                    <Route exact path='/signup' render={()=><Signup/>}/>
                    <Route exact path='/token/:id' render={()=><Login/>}/>
                    <Route component={()=><Home/>}/>
                </Switch>
            {uploadModal?<Upload toggleFun={toggleModal}/>:null}
            </ServicesContex.Provider>
            </AuthContex.Provider>
        </>
    );
}

export default App;
export {AuthContex,ServicesContex};