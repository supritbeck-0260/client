import {createContext} from 'react';

const ServicesContex = createContext({
    refresh:false,
    updateContex:()=>{},
    socket:{},
    notify:'',
    fetchProduct:()=>{},
});

export default ServicesContex;