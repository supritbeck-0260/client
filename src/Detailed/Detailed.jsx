import React, {useEffect,useState} from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import ImageCards from './ImageCardsHome';
import Skeleton from '../Home/Skeleton';
import NotFound from '../NotFound/NotFound';
const useStyles = makeStyles((theme) => ({
    root: {
      width:'100%',
      minHeight:'85vh',
    }, 
    imageCards:{
        width:'100%'
    },
    loader:{
        width: '100%',
        height: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
  }));
const Detailed = (props)=>{
const {id} = useParams();
const [notFound,setNotFound]= useState(null);
const [data,setData] = useState(null);
const getPicure = ()=>{
    Axios.post(process.env.REACT_APP_SERVER_URL+'/get/one',{id:id})
        .then(response=>{
            switch(response.status){
                case 200:
                    setData(response.data);
                    break;
                case 201:
                    setNotFound(response.data.message);
                    break;
              }
        });
}
useEffect(()=>{
    getPicure();
},[]);
const classes = useStyles();
    return(
        <>
            {!notFound?<Box className={classes.root} >
            {data?<ImageCards className={classes.imageCards} info={data}/>:<div className={classes.loader}><Skeleton/></div>}
            </Box>:<NotFound message={notFound}/>}
        </>
    );
}

export default Detailed;