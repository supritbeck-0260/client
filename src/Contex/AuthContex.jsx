import {createContext} from 'react';

const AuthContex = createContext({
    token:'',
    avatar:'',
    name:'',
    isLoggedin:false,
    userID:'',
    login:()=>{},
    logout:()=>{}
});

export default AuthContex;