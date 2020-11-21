import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
            <div className={classes.card}>
                <div className={classes.cardHeader}> {props.label}</div>
                    <div className="card-body">
                        <a href="https://amzn.to/2ZYAGkr" target="_blank" className={classes.link}>
                        <p className="card-text">{props.value}</p>
                        </a>
                </div>
             </div>
        </>
    )
}

export default ToolComponent;