import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: '60%',
      margin:'0 auto',
    },
    cardHeader:{
    display:'flex',
    alignItems:'center',
    padding: '.75rem 1.25rem',
    backgroundColor: 'rgba(0,0,0,.03)',
    },
    card:{
        width: 'fit-content',
        border: '1px solid rgba(0,0,0,.125)',
        borderRadius: '.25rem',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        boxShadow: '10px 10px 5px grey',
        margin:'7px 7px',
    },
    cardBody:{
        padding:'0 5px',
    },
    link:{
        textDecoration:'none',
        color: 'inherit',
    },
    line:{
        width:'100%',
        height:'1px',
        background:'rgba(0,0,0,.125)'
    }
   
  });
const ToolComponent = (props)=>{
    const classes = useStyles();

    return(
        <>
            {props.data && props.data.value?<div className={classes.card}>
                <div className={classes.cardHeader}><props.avatar/> {props.label}</div>
                <div className={classes.line}></div>
                    <div className={classes.cardBody}>
                        <a href={props.data.link?props.data.link:'https://www.google.com/search?q='+props.data.value} target="_blank" className={classes.link}>
                            <p className="card-text">{props.data.value}</p>
                        </a>
                </div>
             </div>:null}
        </>
    )
}

export default ToolComponent;