import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
}));
const CameraMode = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.mainTile}>
                <div className={classes.tile1} style={{fontSize:props.styles.fonts}}>Mode</div>
                <div className={classes.tile2} style={{margin:props.styles.tile2}}></div>
            </div>
        </>
    );
};

export default CameraMode;