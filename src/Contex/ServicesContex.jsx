import {createContext} from 'react';

const ServicesContex = createContext({
    refresh:false,
    updateContex:()=>{},
    socket:{},
    notify:'',
    newupload:false,
    fetchProduct:()=>{},
    analysis:()=>{},
});

export default ServicesContex;