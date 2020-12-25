import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import data from '../profile/InfoData';
const useStyles = makeStyles({
    root: {
      width: '60%',
      margin:'0 auto',
    },
    cardHeader:{
    padding: '.75rem 1.25rem',
    backgroundColor: 'rgba(0,0,0,.03)',
    borderBottom: '1px solid rgba(0,0,0,.125)',
    },
    card:{
        width: 'fit-content',
        border: '1px solid rgba(0,0,0,.125)',
        borderRadius: '.25rem',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        boxShadow: '10px 10px 5px grey',
        margin:'0px 7px',
    },
    link:{
        textDecoration:'none',
        color: 'inherit',
    }
   
  });
const ToolComponent = (props)=>{
    const classes = useStyles();
    return(
        <>
            {props.data?<div className={classes.card}>
                <div className={classes.cardHeader}> {props.label}</div>
                    <div className="card-body">
                        <a href={props.data.link?props.data.link:'https://www.google.com/search?q='+props.data.value} target="_blank" className={classes.link}>
                            <p className="card-text">{props.data.value}</p>
                        </a>
                </div>
             </div>:null}
        </>
    )
}

export default ToolComponent;