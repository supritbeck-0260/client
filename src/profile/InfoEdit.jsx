import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import LensOutlinedIcon from '@material-ui/icons/LensOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import TextField from '@material-ui/core/TextField';

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
        
    }
  }));
const InfoEdit = () =>{
    const classes = useStyles();

    return(
        <>
        <div className={classes.root}>
            <h1><strong>Suprit Beck</strong></h1>
             <div className={classes.text}>
                <Chip
                avatar={<CameraAltRoundedIcon/>}
                className={classes.chip} label="Camera" variant="outlined"/>: <Chip className={classes.chip} label="Nikon" variant="outlined" />
                <TextField
                    className={classes.input}
                    size="small"
                    id="outlined-secondary"
                    label="Camera"
                    variant="outlined"
                    color="secondary"
                ><Chip className={classes.chip} label="50mm" variant="outlined" /></TextField>
            </div>
            <div className={classes.text}>
                <Chip 
                avatar={<LensOutlinedIcon/>}
                className={classes.chip} label="Lenses" variant="outlined" /> : <Chip className={classes.chip} label="50mm" variant="outlined" />
            </div>
            <div className={classes.text}>
                <Chip 
                avatar={<EditOutlinedIcon/>}
                className={classes.chip} label="Editing Software" variant="outlined" /> : <Chip className={classes.chip} label="Lightroom" variant="outlined" />
            </div>
            <div className={classes.text}>
                <Chip 
                avatar={<LibraryAddOutlinedIcon/>}
                className={classes.chip} label="Others" variant="outlined" /> : <Chip className={classes.chip} label="Tripod" variant="outlined" />
            </div>
            <hr></hr>
            <div className={classes.text}>About Me: I am a photographer.</div>
            <div className={classes.text}>Started On: 1st July 2020</div>
        </div>
        </>
    );
}
export default InfoEdit;