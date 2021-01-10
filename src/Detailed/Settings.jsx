import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
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
const Settings = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.card}>
                <div className={classes.cardHeader}>{props.mode=='Manual'?'Settings':'Mode'}</div>
                <div className={classes.line}></div>
                    <div className={classes.cardBody}>
                            {props.mode == 'Manual' && props.settings?
                            <p className="card-text">
                               {props.settings.shutter?<Tooltip title="Shutter"><span>{props.settings.shutter}</span></Tooltip>:null}
                               {props.settings.apprature?<Tooltip title="Apprature"><span>,{props.settings.apprature}</span></Tooltip>:null}
                               {props.settings.iso?<Tooltip title="ISO"><span>,{props.settings.iso}</span></Tooltip>:null}
                               {props.settings.focus?<Tooltip title="Focus"><span>,{props.settings.focus}</span></Tooltip>:null}
                            </p>:
                             <p className="card-text">{props.mode}</p>
                            }
                </div>
        </div>
    );
};

export default Settings;