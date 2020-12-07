import {createContext} from 'react';

const AuthContex = createContext({
    token:'',
    isLoggedin:false,
    userID:'',
    login:()=>{},
    logout:()=>{}
});

export default AuthContex;