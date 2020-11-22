import React, { useEffect, useState } from 'react';
import ImageCards from './ImageCards';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from './Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    gridTitle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
}));
const Home = (props)=>{
const classes = useStyles();
const [cellHeight,setCellHeight] = useState(435);
const images = props.images;
var skeletons=[];
const matches = useMediaQuery('(min-width:600px)');
const [column,setColumn] = useState(1);
for(let i=1;i<=6;i++){
    skeletons.push(<GridListTile className={classes.gridTitle} cols={column}><Skeleton/></GridListTile>);
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
    return(
        <>
         <div className={classes.root}>
         <GridList cellHeight={cellHeight}  cols={3}>
            {images?images.map((val,index) => (
            <GridListTile className={classes.gridTitle} key={index} cols={column}>
                <ImageCards key={index} info={val}/>
            </GridListTile>
            )):skeletons}      
        </GridList>
         </div>
        </>
    );
}

export default Home;