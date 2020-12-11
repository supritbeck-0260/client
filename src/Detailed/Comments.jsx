import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {NavLink} from 'react-router-dom';
import TimeAgo from './TimeStamp';
const useStyles = makeStyles({
    comments:{
        width:'99%',
        margin:'10px auto',
        border:'1px solid #C0C0C0',
      },
      user:{
        display:'flex',
        alignItems:'center',
        background: 'linear-gradient(0deg, #fdfcfb 16%, #e2d1c3 100%)'
      },
      avatar:{
          width:'20px',
          height:'20px',
          margin:'5px',
      },
      name:{
          width:'fit-content',
          margin:'5px 5px 5px 0px',
          fontWeight:'bold',
          fontSize:'small',
          textDecoration:'italic'
      },
      navLink:{
          textDecoration:'none',
          display:'flex',
          alignItems:'center',
          color:'black'
      },
      oneComment:{
          padding:'0px 5px',
          
      },
      timeStamp:{
        fontSize:'10px !important'
      }
});
const Comments = (props)=>{
    const classes = useStyles();
    return(
        <>
      <Paper elevation={1} className={classes.comments}>
        <Typography variant="h6" className={classes.user}>
        <NavLink to={"/profile/"+props.data.uid} className={classes.navLink}>
            <Avatar src={process.env.REACT_APP_SERVER_URL+'/profile/'+props.data.user.avatar} className={classes.avatar}/>
            <Typography variant="body1" className={classes.name}>{props.data.user.name}</Typography>
            </NavLink>
            <div className={classes.timeStamp}><TimeAgo time={props.data.date}/></div>
        </Typography>
    <Typography variant="body1" className={classes.oneComment}>{props.data.comment}</Typography>
      </Paper>
        </>
    );
}

export default Comments;