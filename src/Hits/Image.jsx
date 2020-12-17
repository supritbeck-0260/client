import React from 'react';
import {NavLink} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
      display:'flex',
      flexDirection:'column',
      margin:'0 auto',
    },
    rate:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'fit-content'
    }
});
const Image = (props) =>{
    const classes = useStyles();
    return(
        <>
        <div className={classes.root}>
            <div className={classes.rate}>{props.serial} - Rating:<Rating name="read-only" value={props.data.avgRate.rate} readOnly /></div>
            <NavLink to={'/detailed/'+props.data._id}>
            <img  height='500px' src={process.env.REACT_APP_SERVER_URL+'/uploads/'+props.data.filename} alt={props.data.about}/>   
            </NavLink>
        </div>
        </>
    );
}

export default Image;