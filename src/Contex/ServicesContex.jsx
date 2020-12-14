import {createContext} from 'react';

const ServicesContex = createContext({
    refresh:false,
    updateContex:()=>{},
    socket:{},
    notify:'',
});

export default ServicesContex;