import React,{useState,useContext, useEffect} from 'react';
import {AuthContex,ServicesContex} from '../App';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {NavLink} from 'react-router-dom';
import NotificationIcon from '@material-ui/icons/Notifications';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import TimeAgo from '../Detailed/TimeStamp';
const useStyles = makeStyles((theme) => ({
    button: {
        width: '30px',
        minWidth: '30px !important',
    },
    users:{
        color:'black',
        textDecoration:'none',
        display:'flex',
        // justifyContent:'center',
        alignItems:'center',
        flexDirection:'column'
      },
      avatar:{
        margin:'0 5px 0 0',
      },
      head:{
          display:'flex',
          justifyContent:'center',
        //   background:'silver'
      },
      image:{
          width:'60px',
          height:'50px'
      },
      text:{
        width:'296px'
      },
      timeStamp:{
        width:'296px',
        fontSize:'10px'
      },
      loader:{
        width:'350px',
        display:'flex',
        justifyContent:'center'
      }
}));
const Notification = () =>{
    const classes = useStyles();
    const auth = useContext(AuthContex);
    const services = useContext(ServicesContex);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notify,setNotify] = useState('');
    const [count,setCount] = useState(0);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      Axios.get(process.env.REACT_APP_SERVER_URL+'/notification/checked',{
        headers:{
          'authorization': auth.token
        }
      }).then(response=>{
        switch(response.status){
          case 200:
            setCount(0);
            break;
          case 201:
            console.log(response);
        }
      });
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(()=>{
      Axios.get(process.env.REACT_APP_SERVER_URL+'/notification',{
        headers:{
          'authorization': auth.token
        }
      }).then(response=>{
        switch(response.status){
          case 200:
            setNotify(response.data.notify);
            setCount(response.data.new);
            break;
          case 201:
            console.log(response);
        }

      });
    },[services.notify]);
    return(
        <>
        <Button className={classes.button} onClick={handleClick}>
            <Badge badgeContent={count}><NotificationIcon/></Badge>
        </Button>
    <div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >        
      <MenuItem className={classes.head}>Notification</MenuItem>
      <hr></hr>
        {notify.length?notify.map((value)=>
         <MenuItem onClick={handleClose}>
           <NavLink to={'/profile/'+value.uid} className={classes.users} >
             <Avatar className={classes.avatar} src={process.env.REACT_APP_SERVER_URL+'/profile/'+value.avatar}></Avatar>
          </NavLink>
              <NavLink to={'/profile/'+value.uid} className={classes.users} >
                   <Typography variant='subtitle1'className={classes.text}> <b>{value.name}</b> {value.rate?`rated ${value.rate}`:'commented'} on your picture.</Typography>
                   <Typography variant='subtitle2' className={classes.timeStamp}><TimeAgo time={value.date}/></Typography>
                </NavLink>
            <NavLink to={'/detailed/'+value.iid}>
                <img className={classes.image} src={process.env.REACT_APP_SERVER_URL+'/uploads/'+value.filename}/>
            </NavLink>
            </MenuItem>
        ):<MenuItem onClick={handleClose} className={classes.loader}>No Notifications yet.</MenuItem>}
      </Menu>
    </div>
        </>
    );
}

export default Notification;