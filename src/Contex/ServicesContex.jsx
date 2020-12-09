import {createContext} from 'react';

const ServicesContex = createContext({
    refresh:false,
    updateContex:()=>{}
});

export default ServicesContex;