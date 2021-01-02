import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import GridList from '@material-ui/core/GridList';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import image from '../default.JPG';
import {NavLink} from 'react-router-dom';
import { Card } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
    gridList: {
        width: '100%',
        padding:'5px'
      },
    gridTitleW:{
        height:'300px',
        display:'flex',
        justifyContent:'center',
    },
    gridTitleM:{
        height:'200px',
        display:'flex',
        justifyContent:'center',
    },
    imageW:{
        height:250,
    },
    imageM:{
        height:150,
    },
    label:{
        height:'10%',
        margin:'5px',
    },
    link:{
        textDecoration:'none',
        color: 'inherit',
    },
    cardAction:{
        display:'flex',
        flexWrap: 'wrap',
        justifyContent:'center',
        flexDirection:'column'
    },
}));
const PhotographerSearch = (props) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const [column,setColumn] = useState(3);
    const [view,setView] = useState({image:classes.imageW,gridTitle:classes.gridTitleW,height:330,name:'12px',star:'22px'});
    useEffect(()=>{
        if(matches){
            setColumn(1);
            setView({image:classes.imageW,gridTitle:classes.gridTitleW,height:330,name:'12px',star:'22px'});
        }else {
            setColumn(2);
            setView({image:classes.imageM,gridTitle:classes.gridTitleM,height:240,name:'8px',star:'12px'});
        }
    },[matches]);
    return (
        <>
        <GridList cellHeight={view.height} className={classes.gridList} cols={4}>
            {props.value.map((value,index)=>
            <GridListTile key={index} className={view.gridTitle} cols={column}>
                <Card>
                <CardActionArea>
                <NavLink to={'/profile/'+value._id}>
                        <CardMedia
                        component="img"
                        className={view.image}
                        alt={value.name}
                        image={value.filename?(process.env.REACT_APP_SERVER_URL+'/profile/'+value.filename):image}
                        title={value.name}
                        />
                </NavLink>
                </CardActionArea>
            <CardActions className={classes.cardAction}>
                <Button size="small" style={{fontSize:view.name}} color="primary" href={'/profile/'+value._id}>{value.name}</Button>
                <Tooltip title='Profile Rating'>
                 <Rating name="read-only" style={{fontSize:view.star}} precision={0.5} value={value.avgRate.rate} readOnly />
                </Tooltip>
            </CardActions>
            </Card>
            </GridListTile>)}
            </GridList>
        </>
    );
};

export default PhotographerSearch;