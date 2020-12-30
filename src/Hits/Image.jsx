import React from 'react';
import {NavLink} from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles({
    root: {
      display:'flex',
      flexDirection:'column',
      margin:'0 auto',
    },
    head:{
        display:'flex',
        justifyContent:'space-between',
    },
    avatar:{
        width:'32px',
        height:'32px', 
        margin:'3px', 
    },
    rate:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'fit-content',
    },
    serial:{
        minWidth:'32px',
        width:'32px',
        height:'32px',
        borderRadius:'50%',
        boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        margin:'3px',
    },
    image:{
        height:'426px',
        maxWidth:'100%'
    }
});
const Image = (props) =>{
    const classes = useStyles();
    return(
        <>
        <div className={classes.root}>
            <div className={classes.head}>
            <div className={classes.rate}>
                <Button className={classes.serial} variant="outlined">{props.serial}</Button>
                <Rating name="read-only" precision={0.5} value={props.data.avgRate?props.data.avgRate.rate:0} readOnly />
            </div>
            <NavLink to={'/profile/'+props.data.uid}>
                <Tooltip title={props.data.owner}>
                    <Avatar src={process.env.REACT_APP_SERVER_URL+'/profile/'+props.data.avatar} className={classes.serial}/>
                </Tooltip>
            </NavLink>
            </div>
            <NavLink to={'/detailed/'+props.data._id}>
            {/* <CardMedia 
                className={classes.image}
                image={process.env.REACT_APP_SERVER_URL+'/uploads/'+props.data.filename}
                title={props.data.about?props.data.about.value:''}
              /> */}
            <img className={classes.image} src={process.env.REACT_APP_SERVER_URL+'/uploads/'+props.data.filename} alt={props.data.about?props.data.about.value:''}/>   
            </NavLink>
        </div>
        </>
    );
}

export default Image;