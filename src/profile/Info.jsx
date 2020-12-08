import React, { useContext } from 'react';
import {AuthContex} from '../App'
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import data from './InfoData';
import InputChips from './InputChips';
import MultiChips from './MultiChips';
import Axios from 'axios';
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto 20px',
    },
    text:{
        margin:'10px',
        fontWeight:'normal',
        display:'flex',
        alignItems:'center'
    },
    chip:{
        boxShadow: ({ boxShadow }) => boxShadow,
        "&:hover": {
            boxShadow: '10px 10px 15px grey'
        }   
    },
    chipInput:{
        minWidth:'10px',
        margin: '-3px 0px -3px 8px', 
    },
    head:{
        width:'95%',
        height:'50px',
        background:'#EAE6DA',
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'0px 20px',
    },
    save:{
        margin:'0 5px',
    },
    cancel:{
        margin:'0 5px',
    },
    loader:{
        width:'100%',
        display:'flex',
        justifyContent:'center'
    }
  }));
const Info = () =>{
    const [chipData,setChipData]= useState({
        camera:'',
        lenses:'',
        editing:'',
        others:'',
        about:''
    });
    const {id} = useParams();
    const auth = useContext(AuthContex);
    const location = useLocation()
    const classes = useStyles();
    const [editFlag,setEditFlag] = useState(false);
    const [startedOn,setStartedOn] = useState(null);
    const [toggle,setToggle]=useState(true);
    const [name,setName] = useState(null);
    const [isAuth,setIsAuth] = useState(false);
    const infoFun = ()=>{
        setToggle(false); 
        Axios.post(process.env.REACT_APP_SERVER_URL+'/profile/info/fetch',{id:id})
        .then(response=>
            {
                const value = response.data;
                if(value){
                    if(value.date){
                        const formattedDate = Intl.DateTimeFormat('en-US',{
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit' }).format(new Date(value.date));
                        setStartedOn(formattedDate);
                }
                setChipData({
                    camera:value.camera,
                    lenses:value.lenses,
                    editing:value.editing,
                    others:value.others,
                    about:value.about
                });
                setName(value.name);
                setIsAuth(value._id==auth.userID);
                data[0].values = value.camera;
                data[1].values = value.lenses;
                data[2].values = value.editing;
                data[3].values = value.others; 
                }
              setEditFlag(false);
              setToggle(true);      
            });
    }
    useEffect(()=>{
        setToggle(false);
        infoFun();
    },[location]);
    const edit = ()=>{
        setEditFlag(true);
    }
    const save = () =>{
        Axios.post(process.env.REACT_APP_SERVER_URL+'/profile/info/update',{...chipData,id:id},{
            headers:{
              'authorization': auth.token
            }
          })
          .then((res)=>{
              infoFun();
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }
    const cancel = () =>{
        setEditFlag(false);
    }

const getValues= (key,value)=>{
    setChipData((prev)=>{
        prev[key]=value;
        return {...prev};
    });
}

    return(
        <>
        <div className={classes.head}>
            <h2>{editFlag?<div>Edit Profile</div>:<div>Profile Rating: <Rating name="read-only" value={4} readOnly /></div>}</h2>
            {isAuth?<div>
                {editFlag?<Button className={classes.save} variant="contained" color="primary" onClick={save}>Save<SaveIcon/></Button>:null}
                {editFlag?<Button className={classes.cancel} variant="contained"  color="secondary" autoFocus onClick={cancel}>Cancel<CancelIcon/></Button>:null}
                {!editFlag?<Button variant="contained" onClick={edit}>Edit<EditIcon/></Button>:null}
            </div>:null}
        </div>
        <div className={classes.root}>
            <h1><strong>{name}</strong></h1>
            {toggle?data.map((val,ind)=>
                <div className={classes.text} key={ind}>
                <Chip
                avatar={val.avt}
                className={classes.chip} label={val.label} variant="outlined"/>: 
                {!editFlag?<MultiChips data={val.values}/>:<InputChips data={val.values} getFun={getValues} key={ind} variable={val.key} className={classes.chipInput}/>}
            </div>
            ):<div className={classes.loader}><CircularProgress color="secondary"/></div>}
            <hr></hr>
            <div className={classes.text}>About Me: {!editFlag?chipData.about:<TextField id="outlined-basic" value={chipData.about} onChange={(e)=>getValues('about',e.target.value)} variant="outlined" label="Write something" />}</div>
            <div className={classes.text}>Started On: {startedOn?startedOn:null}</div>
        </div>
        </>
    );
}
export default Info;