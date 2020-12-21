import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    mainTile:{
        display:'flex',
        width:'100%',
        justifyContent:'left',
        alignItems: 'center',
        margin:'0.9% 0'
    },
    tile1:{
        width:'20%',
        height:'36px',
        background:'rgba(0,0,0,.03)',
        border: '1px solid rgba(0,0,0,.125)',
        display:'flex',
        justifyContent:'center',
        alignItems: 'center',
        margin:'10px',
        borderRadius:'5%'
    },
    tile2:{
        width:'77%;',
        height:'36px',
        display:'flex',
        alignItems: 'center',
    },
    textArea:{
        width:'100%',
        padding: '10.5px 7px',
    },
}));
const InputGroup = (props) =>{
    const classes = useStyles();
    const changHandler = (e)=>{
        props.change(e.target);
    }
    return(
        <>
        <div className={classes.mainTile}>
                <div className={classes.tile1}>{props.label}</div>
                <div className={classes.tile2}>
                        <TextField
                            name={props.name}
                            className={classes.textArea}
                            id={props.id}
                            label={props.label2}
                            placeholder={props.placeholder}
                            multiline
                            variant={props.variant}
                            value={props.value}
                            onChange={changHandler}
                            onClick={props.handleClick}
                        />      
                </div>
        </div>
        </>
    );
}

export default InputGroup;