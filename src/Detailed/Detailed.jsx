import React, {useEffect,useState} from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {useParams} from 'react-router-dom';
import Axios from 'axios';
import ImageCards from './ImageCardsHome';
import Skeleton from '../Home/Skeleton';
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
const [data,setData] = useState(null);
const getPicure = ()=>{
    Axios.post('http://localhost:5000/get/one',{id:id})
        .then(response=>{
            setData(response.data);
        });
}
useEffect(()=>{
    getPicure();
},[]);
const classes = useStyles();
    return(
        <>
            <Box className={classes.root} >
            {data?<ImageCards className={classes.imageCards} token={props.token} info={data}/>:<div className={classes.loader}><Skeleton/></div>}
            </Box>
        </>
    );
}

export default Detailed;