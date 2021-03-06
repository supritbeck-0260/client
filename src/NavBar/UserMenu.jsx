import React,{useContext, useState} from 'react';
import {AuthContex} from '../App';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Circle from '@material-ui/icons/AccountCircle';
import Logout from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom:'76px'
    },
    profile:{
        color:'black',
        textDecoration:'none',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      },
}));
const UserMenu = (props)=> {
  const auth = useContext(AuthContex);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      {auth.avatar?<Avatar aria-label="recipe" src={process.env.REACT_APP_SERVER_URL+'/profile/'+auth.avatar}/>:
      <Avatar className={classes.avatar}>{auth.name.charAt(0)}</Avatar>}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <NavLink to={'/profile/'+auth.userID} className={classes.profile} ><Circle/>My Profile</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <NavLink to='/' className={classes.profile} onClick={auth.logout}> <Logout/>Logout</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;