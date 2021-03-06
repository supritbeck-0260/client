import React,{useEffect,useState,useContext} from 'react';
import {ServicesContex} from '../App';
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import GridList from '@material-ui/core/GridList';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import { Card } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    gridList: {
        width: '100%',
        padding:'2px'
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
}));
const ProductSearch = (props) => {
    const services = useContext(ServicesContex);
    const classes = useStyles();
    const searchType = props.type;
    const matches = useMediaQuery('(min-width:600px)');
    const [column,setColumn] = useState(3);
    const [view,setView] = useState({image:classes.imageW,gridTitle:classes.gridTitleW,height:300,product:'12px'});
    useEffect(()=>{
        if(matches){
            setColumn(1);
            setView({image:classes.imageW,gridTitle:classes.gridTitleW,height:300,product:'12px'});
        }else {
            setColumn(2);
            setView({image:classes.imageM,gridTitle:classes.gridTitleM,height:200,product:'8px'});
        }
    },[matches]);
    return (
        <>
        <GridList cellHeight={view.height} className={classes.gridList} cols={4}>
            {props.value.map((value,index)=>
            <GridListTile key={index} className={view.gridTitle} cols={column}>
                <Card>
                <CardActionArea>
                <NavLink to={'/detailed/'+value._id}>
                        <CardMedia
                        component="img"
                        className={view.image}
                        alt={value.about?value.about.value:'image'}
                        image={process.env.REACT_APP_SERVER_URL+'/uploads/'+value.filename}
                        title={value.about?value.about.value:'image'}
                        />
                </NavLink>
                </CardActionArea>
                <CardActions>
                <Button onClick={()=>services.analysis(value.uid,value.owner,value[props.type.category].value,props.type.category)} style={{fontSize:view.product}} size="small" color="primary" href={value[searchType.category] && value[searchType.category].link?value[searchType.category].link:'https://www.google.com/search?q='+value[searchType.category].value} target="_blank">
                {value[searchType.category]?value[searchType.category].value:''}
                </Button>
            </CardActions>
            </Card>
            </GridListTile>)}
            </GridList>
        </>
    );
};

export default ProductSearch;