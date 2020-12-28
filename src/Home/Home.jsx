import React, { useEffect, useState, useContext } from 'react';
import {ServicesContex} from '../App';
import ImageCards from './ImageCards';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from './Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InfiniteScroll from "react-infinite-scroll-component";
import Snackbar from '@material-ui/core/Snackbar';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    gridTitle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    InfiniteScroll:{
        overflow:'hidden !important'
    }
}));
const Home = (props)=>{
const classes = useStyles();
const services = useContext(ServicesContex);
const [cellHeight,setCellHeight] = useState(435);
const [images,setImages] = useState(null);
const [open,setOpen] = useState(false);
var skeletons=[];
const matches = useMediaQuery('(min-width:600px)');
const [column,setColumn] = useState(1);
const [isData,setIsData] = useState(false);
const homeImages = (offset)=>{
    Axios.post(process.env.REACT_APP_SERVER_URL+'/getpics',{offset:offset}).then(response=>{
        if(response.data.length){
            setImages(prev=>{
                if(prev && offset != 0){
                  return [...prev,...response.data];
                }else{
                  return response.data;
                } 
              });
              setIsData(true);
        }else{
            setIsData(false);
        }
  });
}
for(let i=1;i<=3;i++){
    skeletons.push(<GridListTile key={i} className={classes.gridTitle} cols={column}><Skeleton/></GridListTile>);
}
useEffect(()=>{
    if(matches){
      setColumn(1);
    }else{
        setColumn(3);
    }
  },[matches]);
useEffect(()=>{
    if(images){
        setCellHeight(558);
    }else{
        setCellHeight(435);
    }
},[images]);
useEffect(()=>{
    homeImages(0);
},[services.reload]);
const fetchNext = ()=>{
    if(images){
        homeImages(Object.values(images).length);
    }   
}
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    services.updateContex(false,false,false);

  };
useEffect(()=>{
    setOpen(services.newupload);
},[services.newupload]);
const newFeed = ()=>{
    setOpen(false);
    services.updateContex(false,false,true);
}
    return(
        <>
         <div className={classes.root}>
         <InfiniteScroll
            className={classes.InfiniteScroll}
            dataLength={images?Object.values(images).length:0}
            next={fetchNext}
            hasMore={isData}
            scrollThreshold={0.7}
            loader={<GridList cellHeight={435}  cols={3}>{skeletons}</GridList>}
            >
            <GridList cellHeight={cellHeight}  cols={3}>
                {images?images.map((val,index) => (
                <GridListTile className={classes.gridTitle} key={index} cols={column}>
                    <ImageCards key={index} info={val}/>
                </GridListTile>
                )):skeletons}     
            </GridList>
        </InfiniteScroll> 
        </div>
        <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
        autoHideDuration={6000}
        message="New Feed" 
        onClose={handleClose}
        action={<Button onClick={newFeed}><ArrowUpwardIcon style={{color:'white'}}/></Button>}
        />
        </>
    );
}

export default Home;