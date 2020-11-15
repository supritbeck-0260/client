import React from 'react';
import ImageCards from './ImageCards';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from './Skeleton';
const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    gridTitle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    Skeleton:{
        width:'100%',
        height:'100%',
    }
}));
const Home = (props)=>{
const classes = useStyles();
const images = props.images;
var skeletons=[];
for(let i=1;i<=6;i++){
    skeletons.push(<GridListTile className={classes.Skeleton} cols={1}><Skeleton/></GridListTile>);
}

    return(
        <>
         <div className={classes.root}>
         <GridList cellHeight={540}  cols={3}>
            {images?images.map((val,index) => (
            <GridListTile className={classes.gridTitle} key={index} cols={1}>
                <ImageCards key={index} info={val}/>
            </GridListTile>
            )):skeletons}      
        </GridList>
         </div>
        </>
    );
}

export default Home;