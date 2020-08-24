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
    const classes = useStyles();
    
    const [editFlag,setEditFlag] = useState(false);
    const edit = ()=>{
        setEditFlag(true);
    }
    const save = () =>{
        setEditFlag(false);
    }
    const cancel = () =>{
        setEditFlag(false);
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
                {!editFlag?<Chip className={classes.chip} label={val.label2} variant="outlined" />:null}
                {editFlag?<InputChips className={classes.chipInput}/>:null}
            </div>
            )}
            <hr></hr>
            <div className={classes.text}>About Me: I am a photographer.</div>
            <div className={classes.text}>Started On: 1st July 2020</div>
        </div>
        </>
    );
}
export default Info;