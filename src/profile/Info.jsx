import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import data from './InfoData';
import InputChips from './InputChips';
import MultiChips from './MultiChips';
import Axios from 'axios';
import { useEffect } from 'react';
import {update} from './Redux/Action';
import {useSelector,useDispatch} from 'react-redux';

// import Reducer from './Redux';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto 20px',
    },
    text:{
        margin:'10px',
        fontWeight:'normal',

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
    }
  }));
const Info = () =>{
    const dispatch = useDispatch();
    const storedData = useSelector(state=>state);
    useEffect(()=>{
        infoFun();
    },[]);
    const classes = useStyles();
    const [editFlag,setEditFlag] = useState(false);
    const [startedOn,setStartedOn] = useState(null);
    const edit = ()=>{
        setEditFlag(true);
    }
    const save = () =>{
        setEditFlag(false);
        Axios.post('http://localhost:5000/postdata',storedData)
          .then(()=>{
              infoFun();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const cancel = () =>{
        setEditFlag(false);
    }
const [multi,setMulti] = useState([]);
const infoFun = ()=>{
    Axios.get('http://localhost:5000/get')
    .then(response=>
        {
            const value = response.data[response.data.length-1];
            dispatch(update(value));
            if(value){
            const formattedDate = Intl.DateTimeFormat('en-US',{
            year: 'numeric',
            month: 'short',
            day: '2-digit' }).format(new Date(value.date));
            setStartedOn(formattedDate);
            setMulti([value.camera,value.lenses,value.editing,value.others]); 
            }
                       
        });
}

    return(
        <>
        <div className={classes.head}>
            <h2>Profile Rating: <Rating name="read-only" value={4} readOnly /></h2>
            <div>
                {editFlag?<SaveIcon onClick={save}/>:null}
                {editFlag?<CancelIcon onClick={cancel}/>:null}
                {!editFlag?<EditIcon onClick={edit}/>:null}
            </div>
        </div>
        <div className={classes.root}>
            <h1><strong>Suprit Beck</strong></h1>
            
            {data.map((val,ind)=>
                <div className={classes.text} key={ind}>
                <Chip
                avatar={val.avt}
                className={classes.chip} label={val.label1} variant="outlined"/>: 
                {!editFlag?<MultiChips data={multi[ind]}/>:null}
                {editFlag?<InputChips data={multi[ind]} indx={ind} className={classes.chipInput}/>:null}
            </div>
            )}
            <hr></hr>
            <div className={classes.text}>About Me: I am a photographer.</div>
            <div className={classes.text}>Started On: {startedOn?startedOn:null}</div>
        </div>
        </>
    );
}
export default Info;