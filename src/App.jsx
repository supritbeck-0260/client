import React, { useEffect, useState }  from 'react';
import socket from 'socket.io-client';
import Navbar from './NavBar/Navbar';
import {Route,Switch} from 'react-router-dom';
import ProfilePage from './profile/ProfilePage';
import Home from './Home/Home';

import Detailed from './Detailed/Detailed';
import Signup from './Login/Signup';
import Login from './Login/Login';
import AuthContex from './Contex/AuthContex';
import ServicesContex from './Contex/ServicesContex';
import Forgot from './Login/Forgot';
import Confirm from './Login/Confirm';
import Hits from './Hits/Hits';
import Admin from './Admin/Admin';
import Axios from 'axios';
const App = ()=>{
let tokenExpairTime = localStorage.getItem('tokenExpairTime');
const tokenAliveFor = 86395000;

const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
const [userID,setUserID] = useState(localStorage.getItem('userID')?localStorage.getItem('userID'):'');
const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('token')?true:false);
const [avatar,setAvatar] = useState(localStorage.getItem('avatar'));
const [reload,setReload] = useState(false);
const [notify,setNotify] = useState('');
const [newupload,setNewupload] = useState(false);
const io = socket(process.env.REACT_APP_SERVER_URL);
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

const updateContex = (avatar,newupload,reload)=>{
        if(reload)setReload(prev=>!prev);
        if(avatar){
        localStorage.setItem('avatar',avatar);
        setAvatar(avatar);
        }
        setNewupload(newupload);
}
let logoutCode;
const logoutTimer = ()=>{
    if(tokenExpairTime && tokenExpairTime>Date.now()){
        logoutCode=setTimeout(logout,tokenExpairTime-Date.now());
        io.on(userID,data=>{
            console.log(data);
            setNotify(data);
        });
    }else{
        logout();
        clearTimeout(logoutCode);
    } 
    io.on('newupload',data=>{
        console.log(data);
        if(data) setNewupload(true);
    });
}
useEffect(logoutTimer,[]);
const fetchProduct = async (item,name)=>{
   const result = await Axios.post(process.env.REACT_APP_SERVER_URL+'/product/fetch',{item,name},{
        headers:{
          'authorization': token
        }
      })
      return result;
}
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
                    updateContex:updateContex,
                    socket:io,
                    notify:notify,
                    newupload:newupload,
                    fetchProduct:fetchProduct,
                }}
            >
                <Navbar/>
                <Switch>
                    <Route exact path='/' render={()=><Home/>}/>
                    <Route exact path='/profile/:id' render={()=><ProfilePage/>}/>
                    <Route exact path='/detailed/:id' render={()=><Detailed/>}/>
                    <Route exact path='/hits' render={()=><Hits/>}/>
                    <Route exact path='/login' render={()=><Login/>}/>
                    <Route exact path='/signup' render={()=><Signup/>}/>
                    <Route exact path='/token/:id' render={()=><Login/>}/>
                   {isLoggedin?null: <Route exact path='/forgot' render={()=><Forgot/>}/>}
                   <Route exact path='/adminaccess' render={()=><Admin/>}/>
                    <Route exact path='/password/:id' render={()=><Confirm/>}/>
                    <Route component={()=><Home/>}/>
                </Switch>
            </ServicesContex.Provider>
            </AuthContex.Provider>
        </>
    );
}

export default App;
export {AuthContex,ServicesContex};