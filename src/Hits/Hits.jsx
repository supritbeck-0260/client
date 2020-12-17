import React,{useEffect,useState} from 'react';
import {Carousel} from '3d-react-carousal';
import PausedIcon from '@material-ui/icons/PauseCircleFilled';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Axios from 'axios';
import Image from './Image';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
    playPause: {
      display:'flex',
      justifyContent:'center',
    },
    head:{
        textAlign:'center',
    },
    loader:{
        width:'94vw',
        height:'85vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
});

const Hits = () =>{
    const classes = useStyles();
    const [images,setImages] = useState([]);
    const [play,setPlay] = useState(true);
useEffect(()=>{
        Axios.get(process.env.REACT_APP_SERVER_URL+'/hits').then(response=>{
            console.log(response);
            switch(response.status){
                case 200:
                    if(response.data.length){
                        const data = response.data;
                       setImages(data.map((value,index)=><Image serial={index+1} data={value}/>));
                    }
                    break;
                case 201:
                    break;
            }
        });
        },[]);
    return(
        <>
            {images.length?
            <div>
                <Typography className={classes.head} gutterBottom variant="h5" component="h1">
                    TOP {images.length} CAPTURES
                </Typography>
                <Carousel slides={images} autoplay={play} interval={3000}/>
                <div className={classes.playPause}>
                    <Button>{play?<PausedIcon onClick={()=>setPlay(prev=>!prev)}/>:<PlayIcon onClick={()=>setPlay(prev=>!prev)}/>}</Button> 
                </div>
            </div>:<div className={classes.loader}><CircularProgress color="secondary"/></div>}
        </>
    )
}

export default Hits;