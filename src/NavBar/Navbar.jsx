import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {toggle} from '../Redux/Action';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:'76px'
  },
  appbar: {
    backgroundColor:'#e2d1c3'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo:{
    color:'white',
    textDecoration:'none',
  },
  profile:{
    color:'white',
    textDecoration:'none',
  }
}));

const Navbar = ()=> {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
            <NavLink to='/' className={classes.logo}>ProClick</NavLink>
            </Typography>
          <Button color="inherit" onClick={()=>dispatch(toggle())}>Upload</Button>
          <Button color="inherit">Login</Button>
          <NavLink to='/profile' className={classes.profile} >
          <Avatar aria-label="recipe" className={classes.avatar} src="http://localhost:5000/profile/profile_1604060279140.jpg"/>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
