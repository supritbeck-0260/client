import {createContext} from 'react';

const AuthContex = createContext({
    token:'',
    avatar:'',
    isLoggedin:false,
    userID:'',
    login:()=>{},
    logout:()=>{}
});

export default AuthContex;