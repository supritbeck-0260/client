import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const useStyles = makeStyles((theme) => ({
    mainTile:{
        display:'flex',
        width:'100%',
        justifyContent:'left',
        alignItems: 'center',
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
    formControl: {
        margin: theme.spacing(1),
        width:'20%',
        margin:'5px 0 0 0',
      },
      container:{
        display:'flex',
        flexDirection:'column',
        border:'1px solid rgba(0,0,0,.2)',
        borderRadius:'5px',
        margin: '0px 3px',
      },
      input:{
        border: 'none',
        outline:'none',
        borderRadius:'5px',
        padding: '0px 4px',
      },
      label:{
        padding: '4px',
        borderBottom:'1px solid rgba(0,0,0,.2)',
        textAlign: 'center',
      }
}));
const CameraMode = (props) => {
    const classes = useStyles();
    const [mode,setMode] = useState('A');
    const [settings,setSettings] = useState({shutter:'',apprature:'',iso:'',focus:''});
    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setSettings(prev=>{
            prev[name]=value;
            return {...prev};
        });
    }
    return (
        <>
            <div className={classes.mainTile}>
                <div className={classes.tile1} style={{fontSize:props.styles.fonts}}>Mode</div>
                <FormControl variant="outlined" className={classes.formControl} style={{width:props.styles.select}}>
                    <InputLabel id="demo-simple-select-outlined-label">Select</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={mode}
                        onChange={(e)=>setMode(e.target.value)}
                        label="mode"
                        >
                            <MenuItem value='A'>Auto</MenuItem>
                            <MenuItem value='M'>Manual</MenuItem>
                        </Select>
                </FormControl>
            </div>
            {mode =='M'?<div className={classes.mainTile}>
                <div className={classes.tile1} style={{fontSize:props.styles.fonts}}>Settings</div> 
                <div className={classes.container}>
                    <span className={classes.label} style={{fontSize:props.styles.label}}>Shutter Speed</span>
                    <input name='shutter' value={settings.shutter} onChange={changeHandler} className={classes.input} style={{width:props.styles.input,height:props.styles.inheight}} type="text"/>
                </div>
                <div className={classes.container}>
                    <span className={classes.label} style={{fontSize:props.styles.label}}>Apprature</span>
                    <input name='apprature' value={settings.apprature} onChange={changeHandler} className={classes.input} style={{width:props.styles.input,height:props.styles.inheight}} type="text"/>
                </div>
                <div className={classes.container}>
                    <span className={classes.label} style={{fontSize:props.styles.label}}>ISO</span>
                    <input name='iso' value={settings.iso} onChange={changeHandler} className={classes.input} style={{width:props.styles.input,height:props.styles.inheight}} type="text"/>
                </div>
                <div className={classes.container}>
                    <span className={classes.label} style={{fontSize:props.styles.label}}>Focus</span>
                    <input name='focus' value={settings.focus} onChange={changeHandler} className={classes.input} style={{width:props.styles.input,height:props.styles.inheight}} type="text"/>
                </div>
            </div>:null}
        </>
    );
};

export default CameraMode;