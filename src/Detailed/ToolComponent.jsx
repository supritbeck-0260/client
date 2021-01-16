import React, { useState , useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyles = makeStyles({
    root: {
      width: '60%',
      margin:'0 auto',
    },
    cardHeader:{
    display:'flex',
    alignItems:'center',
    backgroundColor: 'rgba(0,0,0,.03)',
    },
    card:{
        width: 'fit-content',
        border: '1px solid rgba(0,0,0,.125)',
        borderRadius: '.25rem',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
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
    const matches = useMediaQuery('(min-width:600px)');
    const [view,setView] = useState({});
    useEffect(()=>{
        if(matches) setView({font:'12px',margin:'7px',boxShadow: '10px 10px 5px grey',padding: '.75rem 1.25rem',icon:'20px'});
        else setView({font:'9px',margin:'4px',boxShadow: '5px 5px 5px grey',padding: '5px',icon:'15px'});
      },[matches]);
    return(
        <>
            {props.data && props.data.value?<div className={classes.card} style={{fontSize:view.font,margin:view.margin,boxShadow:view.boxShadow}}>
                <div className={classes.cardHeader} style={{padding:view.padding}}><props.avatar style={{fontSize:view.icon}}/> {props.label}</div>
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