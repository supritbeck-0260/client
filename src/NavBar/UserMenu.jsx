import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Circle from '@material-ui/icons/AccountCircle';
import Logout from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import {NavLink} from 'react-router-dom';
import Axios from 'axios';
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
  const userID = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = ()=>{
    
    Axios.get('http://localhost:5000/auth/logout',{
        headers:{
            'authorization' :token 
        }
    });
      props.tokenSet('');
  }
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar aria-label="recipe" src="http://localhost:5000/profile/profile_1604060279140.jpg"/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
            <NavLink to={'/profile/'+userID} className={classes.profile} ><Circle/>My Profile</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <NavLink to='/' className={classes.profile} onClick={logoutHandler}> <Logout/>Logout</NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;