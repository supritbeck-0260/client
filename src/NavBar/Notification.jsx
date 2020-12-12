import React,{useState} from 'react';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import {NavLink} from 'react-router-dom';
import NotificationIcon from '@material-ui/icons/Notifications';
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
      }

}));
const Notification = () =>{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return(
        <>
        <Button className={classes.button} onClick={handleClick}>
            <Badge badgeContent={4}><NotificationIcon/></Badge>
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
        <MenuItem onClick={handleClose}>
            <Avatar className={classes.avatar} src='http://localhost:5000/uploads/file_1607623866263.webp'>S</Avatar>
            <NavLink to='/' className={classes.users} >
               <Typography variant='subtitle1'> <b>Suprit Beck</b> rated 5 on your picture.</Typography>
               <Typography variant='subtitle2'> 2 min ago</Typography>
            </NavLink>
        <NavLink to='/'>
            <img className={classes.image} src='http://localhost:5000/uploads/file_1607623617812.webp'/>
        </NavLink>
        </MenuItem>
      </Menu>
    </div>
        </>
    );
}

export default Notification;