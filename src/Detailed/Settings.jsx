import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';
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
const Settings = (props) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    const [view,setView] = useState({});
    useEffect(()=>{
        if(matches) setView({font:'12px',margin:'7px',boxShadow: '10px 10px 5px grey',padding: '.75rem 1.25rem',icon:'20px'});
        else setView({font:'9px',margin:'4px',boxShadow: '5px 5px 5px grey',padding: '5px',icon:'15px'});
      },[matches]);
    return (
        <div className={classes.card} style={{fontSize:view.font,margin:view.margin,boxShadow:view.boxShadow}}>
                <div className={classes.cardHeader} style={{padding:view.padding}}>
                    <SettingsIcon style={{fontSize:view.icon}}/>{props.mode=='Manual'?'Settings':'Mode'}</div>
                <div className={classes.line}></div>
                    <div className={classes.cardBody}>
                            {props.mode == 'Manual' && props.settings?
                            <p className="card-text">
                               {props.settings.shutter && <Tooltip title="Shutter"><span>{props.settings.shutter}</span></Tooltip>}
                               {props.settings.apprature && <Tooltip title="Apprature"><span>,{props.settings.apprature}</span></Tooltip>}
                               {props.settings.iso && <Tooltip title="ISO"><span>,{props.settings.iso}</span></Tooltip>}
                               {props.settings.focus && <Tooltip title="Focus"><span>,{props.settings.focus}</span></Tooltip>}
                            </p>:
                             <p className="card-text">{props.mode}</p>
                            }
                </div>
        </div>
    );
};

export default Settings;