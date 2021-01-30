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
import Search from './Search/Search';
import Graph from './Admin/Chart/Chart'
const App = ()=>{
let tokenExpairTime = localStorage.getItem('tokenExpairTime');
const tokenAliveFor = 86395000;

const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
const [userID,setUserID] = useState(localStorage.getItem('userID')?localStorage.getItem('userID'):'');
const [isLoggedin, setIsLoggedin] = useState(localStorage.getItem('token')?true:false);
const [avatar,setAvatar] = useState(localStorage.getItem('avatar'));
const [name,setName] = useState(localStorage.getItem('name')?localStorage.getItem('name'):'');
const [reload,setReload] = useState(false);
const [notify,setNotify] = useState('');
const [newupload,setNewupload] = useState(false);
const io = socket(process.env.REACT_APP_SERVER_URL);
const login = (token,userID,avatar,name)=>{
    localStorage.setItem('userID',userID)
    localStorage.setItem('token',token); 
    localStorage.setItem('avatar',avatar?avatar:'');
    localStorage.setItem('name',name);
    localStorage.setItem('tokenExpairTime',Date.now()+tokenAliveFor);
    tokenExpairTime = localStorage.getItem('tokenExpairTime');
    logoutTimer();
    setToken(token);
    setUserID(userID);
    setAvatar(avatar);
    setIsLoggedin(true);
    setName(name);
}
const logout = ()=>{
    localStorage.removeItem('userID')
    localStorage.removeItem('token'); 
    localStorage.removeItem('tokenExpairTime');
    localStorage.removeItem('avatar');
    localStorage.removeItem('name');
    setToken('');
    setUserID('');
    setAvatar('');
    setName('');
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
        if(data){ 
            setNewupload(true);
            setTimeout(()=>setNewupload(false),6000);
        };
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
const analysis = (uid,owner,product,type)=>{
    Axios.post(process.env.REACT_APP_SERVER_URL+'/analysis/save',{uid,owner,product,type});
}
    return(
        <>
            <AuthContex.Provider value={{
                token:token,
                avatar:avatar,
                name:name,
                isLoggedin:isLoggedin,
                userID:userID,
                login:login,
                logout:logout,
            }}>
            <ServicesContex.Provider
                value={{
                    reload:reload,
                    updateContex:updateContex,
                    socket:io,
                    notify:notify,
                    newupload:newupload,
                    fetchProduct,
                    analysis
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
                    <Route exact path='/search' render={()=><Search/>}/>
                   {isLoggedin?null: <Route exact path='/forgot' render={()=><Forgot/>}/>}
                   <Route exact path='/adminaccess' render={()=><Admin/>}/>
                    <Route exact path='/password/:id' render={()=><Confirm/>}/>
                    <Route exact path='/chart' render={()=><Graph/>}/>
                    <Route component={()=><Home/>}/>
                </Switch>
            </ServicesContex.Provider>
            </AuthContex.Provider>
        </>
    );
}

export default App;
export {AuthContex,ServicesContex};