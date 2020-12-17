import React,{useEffect,useState} from 'react';
import {Carousel} from '3d-react-carousal';
import PausedIcon from '@material-ui/icons/PauseCircleFilled';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';
import Axios from 'axios';
import Image from './Image';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    playPause: {
      display:'flex',
      justifyContent:'center',
    },
});

const Hits = () =>{
    const classes = useStyles();
    const [images,setImages] = useState([]);
    const [play,setPlay] = useState(true);
    console.log('test',play);
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
                <Carousel slides={images} autoplay={play} interval={3000}/>
                <div className={classes.playPause}>
                    {play?<PausedIcon onClick={()=>setPlay(prev=>!prev)}/>:<PlayIcon onClick={()=>setPlay(prev=>!prev)}/>}
                </div>
            </div>:null}
        </>
    )
}

export default Hits;