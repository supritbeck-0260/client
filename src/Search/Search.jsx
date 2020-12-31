import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CardMedia from '@material-ui/core/CardMedia';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    root: {
        width:'fit-content',
        height:'fit-content',
              
    },
    headerM:{
        width:'100%',
        height:'fit-content',
        margin:'auto',
        border:'1px solid rgb(211,211,211)',
        borderRadius:'5px',
        display:'flex',
        justifyContent:'center',
    },
    headerW:{
        width:'60%',
        height:'fit-content',
        margin:'auto',
        border:'1px solid rgb(211,211,211)',
        borderRadius:'5px',
        display:'flex',
        justifyContent:'center'
    },
    inputBox:{
        width:'fit-content',
        height:'fit-content',
        margin:'auto',
        border:'1px solid rgb(211,211,211)', 
        borderRadius:'5px',
        display:'flex',
        justifyContent:'row',
        margin:'5px',
    },
    input:{
        border:'none',
        outline:'none',
        margin:'5px',
        width:'276px',
    },
    searchBtn:{
        minWidth:'20px',
        width:'43px',
    },
    container:{
        marginTop:'10px',
        border:'1px solid rgb(211,211,211)',
        borderRadius:'5px',
    },
    gridList: {
        width: '100%',
      },
    gridTitle:{
        height:'300px',
        display:'flex',
        justifyContent:'center',
        
    },
    image:{
        width:'auto',
        height:'90%',
    },
    label:{
        height:'10%',
        margin:'5px',
    }
    }));
const Search = () => {
    const classes = useStyles();
    const [view,setView] = useState({header:classes.headerW});
    const matches = useMediaQuery('(min-width:600px)');
    const [results,setResults] = useState([]);
    const search = ()=>{
        Axios.get(process.env.REACT_APP_SERVER_URL+'/hits').then(response=>{
            switch(response.status){
                case 200:
                    setResults(response.data);
                    break;
            }

        });
    }
    useEffect(()=>{
        if(matches) setView({header:classes.headerW});
        else setView({header:classes.headerM});
    },[matches]);
    useEffect(search,[]);
    return (
        <>
        <div className={view.header}>
            <div className={classes.inputBox}>
                <input className={classes.input} placeholder='Search Box' type="text"/>
                <Button className={classes.searchBtn}><SearchIcon/></Button>
            </div>
        </div>
        <div className={classes.container}>
            <GridList cellHeight={300} className={classes.gridList} cols={3}>
            {results.length?results.map(value=>
            <GridListTile className={classes.gridTitle} cols={1}>
                        <CardMedia
                        component="img"
                        className={classes.image}
                        alt={value.about?value.about.value:'image'}
                        image={process.env.REACT_APP_SERVER_URL+'/uploads/'+value.filename}
                        title={value.about?value.about.value:'image'}
                        />
             <div className={classes.label}>
                 <a href={value.camera?value.camera.link:''}>
                     {value.camera?value.camera.value:''}
                 </a></div>
            </GridListTile>):<GridListTile className={classes.gridTitle} cols={1}>No result found</GridListTile>}
            </GridList>
        </div>
        </>
    );
};

export default Search;